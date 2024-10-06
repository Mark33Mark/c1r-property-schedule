// @desc Get all notes 
// @route GET /notes
// @access Private

import { MongoClient, ObjectId } from "mongodb";
import { verifyCookie } from './helpers';

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();


export const handler = async (event) => {

    // Verify access privileges
    const authHeader = event.headers.authorisation || event.headers.Authrorisation;
	const verify = verifyCookie(authHeader);

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
			console.log('username = ', verify.username,'\n  roles = ', verify.roles);
			break;

		default:
			console.log("undefined");
	}

    try {
        const database = (await clientPromise).db(process.env.MONGODB);
        const notes = database.collection("notes");
        const users = database.collection("users");

    // Get all notes from MongoDB
    const note = await notes.find({}).toArray();

    // If no notes 
    if (!note?.length) {
        return {
            statusCode: 204,
            body: JSON.stringify({ message: 'No notes created yet.' }),
        };
    };

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const notesWithUser = await Promise.all(note.map(
        
        async (item) => {
        
            // convert string id into Mongodb's required binary object format
            // need to use string interpolation to make sure variable is a string - otherwise
            // you get 'deprecated' warning.
            // https://github.com/Automattic/mongoose/issues/14608
            const noid = new ObjectId(`${item.user}`);

            const user = await users.find({_id: noid}).toArray();
            
            return { 
                ...item, 
                username: user[0].username 
            };
        }
    ));

    return {
        statusCode: 200,
        body: JSON.stringify(notesWithUser)
    }

    } catch (err) {

        return {
            statusCode: 500,
            body: JSON.stringify({ "msg": err.message })
        };
    };
};