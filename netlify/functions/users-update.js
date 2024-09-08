// @desc Update a user
// @route PATCH /users
// @access Private

import argon2 from 'argon2';
import { MongoClient, ObjectId } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();


export const handler = async (event) => {

	const userSplat = JSON.parse(event.body)
	const { id, username, roles, active, password } = userSplat;

	try {

		const database = (await clientPromise).db(process.env.MONGODB);
        const collection = database.collection("users");

		// Confirm data
		if (
			!id ||
			!username ||
			!Array.isArray(roles) ||
			!roles.length ||
			typeof active !== 'boolean'
		) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Password is optional, all other fields are required.' }),
			}
		}

		// Does the user exist to update?
		// convert string id into Mongodb's required binary object format

		// need to use string interpolation to make sure variable is a string - otherwise
		// you get 'deprecated' warning.
        // https://github.com/Automattic/mongoose/issues/14608
		const noid = new ObjectId(`${id}`);

		const user = await collection.find({_id: noid}).toArray();

		if (!user) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'User not found.' }),
			}
		}

		// Check for duplicates
		// https://www.mongodb.com/community/forums/t/finding-duplicate-documents-before-creating-unique-index/6243
		const duplicate = await collection.aggregate([
			{
				$match: {
					username
				},
			},
		]).toArray();

		// if duplicate username's, raise error code and exit.
		if ( duplicate.filter((obj) => obj.username === username && obj._id.toString() !== id ).length > 0 ) {
			return {
				statusCode: 409,
				body: JSON.stringify({ message: 'Duplicate username.' }),
			}
		};

		let setPassword = "";
		if (password) {
			// Hash password
			// Argon2 recommends against over-riding its default salt rounds
			setPassword = await argon2.hash(password); 
		} else {
			setPassword = user[0].password;
		};

		// https://www.mongodb.com/docs/manual/tutorial/update-documents/
		const updatedUser = await collection.updateOne({ _id: noid },{
			$set: { username, roles, active, password: setPassword},
			$currentDate: { lastModified: true }
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ message: `${updatedUser.username} updated` }),
		}

	} catch (err) {

		console.log('error = ', err);
					
		return {
			statusCode: 500,
			body: JSON.stringify({ "msg": err.message }),
		}
	} 
};