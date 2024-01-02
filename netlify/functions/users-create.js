// @desc Create new user
// @route POST /users
// @access Private

import argon2 from 'argon2';
import { MongoClient } from "mongodb";
import { verifyCookie } from './helpers';

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();


export const handler = async (event) => {

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

	const userSplat = JSON.parse(event.body)
	const { username, password, roles } = userSplat;

	try {

		const database = (await clientPromise).db(process.env.MONGODB);
        const collection = database.collection("users");

		// Confirm data
		if (!username || !password) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'All fields are required.' }),
			};
		};

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

		// Hash password
		// Argon2 recommends against over-riding its default salt rounds
		const hashedPwd = await argon2.hash(password); 

		const userObject =
			!Array.isArray(roles) || !roles.length
				? { username, password: hashedPwd }
				: { username, password: hashedPwd, roles };

		// Create and store new user
		const user = await collection.insertOne(userObject);

		if (user) {
			// user created
			return {
				statusCode: 201,
				body: JSON.stringify({ message: `New user ${username} created` }),
			};
		} else {
			// failed to create user
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Invalid user data received' }),
			};
		};

	} catch (err) {

		return {
			statusCode: 500,
			body: JSON.stringify({ "msg": err.message }),
		};
	};
};