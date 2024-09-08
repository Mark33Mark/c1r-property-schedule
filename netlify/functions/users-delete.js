// @desc Delete a user
// @route DELETE /users
// @access Private

import { MongoClient, ObjectId } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();

export const handler = async (event) => {
    
    const userSplat = JSON.parse(event.body);
    const { id } = userSplat;

    try {
        // Connect to the database and get a reference to the `users` and 'notes' collections
        const database = (await clientPromise).db(process.env.MONGODB);
        const users = database.collection("users");
        const notes = database.collection("notes");

        // Confirm data
        if (!id) {
            return {
                statusCode: 400, 
                body: JSON.stringify({ message: 'User ID Required' }) 
            }
        };

		// need to use string interpolation to make sure variable is a string - otherwise
		// you get 'deprecated' warning.
        // https://github.com/Automattic/mongoose/issues/14608
        const noid = new ObjectId(`${id}`);


        // Does the user still have assigned notes?
        const note = await notes.aggregate([
            {
                $match: {
                    user: noid
                },
            }
        ]).toArray();

        console.log('notes assigned ', note);

        if ( note.length > 0 ) {
            return {
                statusCode: 400,  
                body: JSON.stringify({ message: 'User has assigned notes.' }) 
            }
        };

        // Does the user exist to delete?
        const user = await users.find({_id: noid}).toArray();

        if (user.length === 0) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ message: 'User not found.' }) 
            };
        };

        const result = await users.deleteOne({_id: noid});

        return {
            statusCode: 200, 
            body: JSON.stringify(`Username: ${result.username} \nwith ID: ${result._id} \nhas been deleted.`) 
        };

    } catch (err) {
            
        return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message }),
        }

    };
};