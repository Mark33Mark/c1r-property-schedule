// @desc Login
// @route POST /login
// @access Public

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { createClient, createJwtCookie } from './helpers';

export const handler = async (event) => {
	const dbClient = createClient();
	let errorStatusCode = 500;

	try {
		// Connect to the database and get a reference to the `users` collection
		await dbClient.connect();
		const users = dbClient.usersCollection();

		// console.log('event = ', event.body);

		if(!event.body) {

			const url = event.rawUrl.substring(0,event.rawUrl.lastIndexOf("/"));
			return {
				statusCode: errorStatusCode,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					msg: `Please return to the welcome page ${url}`,
				}),
			};
		}

		// Get the username and password from the request body
		const { username, password } = JSON.parse(event.body);

		// Check to see if the user exists, if not return error (401 Unauthorized)
		const foundUser = await users.findOne({ username });

		if (!foundUser || !foundUser.active) {
			errorStatusCode = 401;
			throw new Error(`Unauthorised`);
		}

		// Compare the password, if it doesn't match return error (401 Unauthorized)
		// const matches = await bcrypt.compare(password, existingUser.password)
		const match = await argon2.verify(foundUser.password, password);

		if (!match) {
			errorStatusCode = 401;
			throw new Error(`Unauthorised`);
		}

		// Create a JWT and serialize as a secure http-only cookie
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: foundUser.username,
					roles: foundUser.roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '1h' }
		);

		const jwtCookie = createJwtCookie(username);

		// log in db the IP and time when logging in - replaces previous, if it exists.
        const loginIp = event.headers["x-nf-client-connection-ip"];
        await users.updateOne({username},{$set: {loginIp, lastLogin: new Date()} })

		// Return the user id and a Set-Cookie header with the JWT cookie
		return {
			statusCode: 200,
			headers: {
				'Set-Cookie': jwtCookie,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ accessToken }),
		};
	} catch (err) {
		return {
			statusCode: errorStatusCode,
			body: JSON.stringify({
				'status code': errorStatusCode,
				msg: err.message,
			}),
		};
	} finally {
		dbClient.close();
	}
};
