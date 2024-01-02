// @desc Create new note
// @route POST /notes/create
// @access Private

import { MongoClient, ObjectId } from "mongodb";
import { verifyCookie } from './helpers';

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();


export const handler = async (event) => {

    const notesSplat = JSON.parse(event.body);
    const { user, title, text } = notesSplat;

	// Verify access privileges
	const authHeader = event.headers.authorisation || event.headers.Authrorisation;
	const verify = await verifyCookie(authHeader);

	switch (verify.status) {
		case 401:
			console.log(verify.message);

			return {
				statusCode: verify.status,
				body: JSON.stringify({message: verify.message})
			};

		case 403:
			console.log(verify.message);

			return {
				statusCode: verify.status,
				body: JSON.stringify({message: verify.message})
			};

		case 200:
			console.log('username = ', verify.username,',\n  roles = ', verify.roles);
			break;

		default:
			console.log("undefined");
	}

    try {
        const database = (await clientPromise).db(process.env.MONGODB);
        const notes = database.collection("notes");

        // Confirm data
        if (!user || !title || !text) {
            return {
				statusCode: 400,
				body: JSON.stringify({ message: 'All fields are required.' }),
			};
        };

        // Check for duplicate title
		// https://www.mongodb.com/community/forums/t/finding-duplicate-documents-before-creating-unique-index/6243
		const duplicate = await notes.aggregate([
			{
				$match: {
					title
				},
			},
		]).toArray();

		// if duplicate title's, raise error code and exit.
		if ( duplicate.filter((obj) => obj.title === title && obj.user.toString() !== user ).length > 0 ) {
			return {
				statusCode: 409,
				body: JSON.stringify({ message: 'Duplicate note title.' }),
			};
		};

        // Create and store the new user 
        // convert string id and user into Mongodb's required binary object format
        const noidUser = new ObjectId(user);
        const completed = false;
        const created = new Date();
        const note = await notes.insertOne({ user: noidUser, title, text, completed, created, updated: created })

		if (note) {
			// new note created
			return {
				statusCode: 201,
				body: JSON.stringify({ message: `A new note has been created.` })
			};
		} else {
			// failed to create user
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Invalid note data received.' })
			};
		};

    } catch (err) {

        return {
            statusCode: 500,
            body: JSON.stringify({ "msg": err.message }),
        };
    };
};