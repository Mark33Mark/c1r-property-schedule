// @desc Update a note
// @route PATCH /notes/update
// @access Private

import { MongoClient, ObjectId }  from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();


export const handler = async (event) => {

	const noteSplat = JSON.parse(event.body)
	const { id, user, title, text, completed } = noteSplat;

	try {

        const database = (await clientPromise).db(process.env.MONGODB);
        const notes = database.collection("notes");

        // Confirm data
        if (!id || !user || !title || !text || typeof completed !== 'boolean') {
            return {
				statusCode: 400,
				body: JSON.stringify({ message: 'All fields are required.' }),
			};
        }

        // Confirm note exists to update
        // convert string id and user into Mongodb's required binary object format
        const noid = new ObjectId(id);
        const noidUser = new ObjectId(user);
        const note = await notes.find({_id: noid}).toArray();

        if ( note.length === 0 ) {
            return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Note not found.' }),
			};
        }

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
		if ( duplicate.filter((obj) => obj.title === title && obj._id.toString() !== id ).length > 0 ) {
			return {
				statusCode: 409,
				body: JSON.stringify({ message: 'Duplicate note title.' }),
			};
		};

        const updatedNote = await notes.updateOne({ _id: noid },{
			$set: { user: noidUser, title, text, completed}, 
			$currentDate: { updated: true }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(`'${title}' updated`)
        };

	} catch (err) {

		return {
			statusCode: 500,
			body: JSON.stringify({ "msg": err.message }),
		};
	};
};