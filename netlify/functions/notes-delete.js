// @desc Delete a note
// @route DELETE /notes/delete
// @access Private

import { MongoClient, ObjectId } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();

export const handler = async (event) => {
    
    const noteSplat = JSON.parse(event.body);
    const { id } = noteSplat;

    try {
        // Connect to the database and get a reference to the `users` and 'notes' collections
        const database = (await clientPromise).db(process.env.MONGODB);
        const notes = database.collection("notes");

        // Confirm data
        if (!id) {
            return res.status(400).json({ message: 'Note ID required' })
        }

        // Confirm note exists to delete
        // convert string id into Mongodb's required binary object format
        
		// need to use string interpolation to make sure variable is a string - otherwise
		// you get 'deprecated' warning.
        // https://github.com/Automattic/mongoose/issues/14608a
		const noid = new ObjectId(`${id}`);
        
        const note = await notes.find({_id: noid}).toArray();

        if (note.length === 0) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'Note not found.' }) 
            };
        }

        const result = await notes.deleteOne({_id: noid});

        return {
            statusCode: 200, 
            body: JSON.stringify(`Note '${result.title}' with ID: ${result._id} has been deleted.`) 
        };

    } catch (err) {
            
        return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message }),
        }

    };
};