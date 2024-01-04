// @desc Get all property data
// @route GET /property
// @access Private

import { createClient } from './helpers/db-helper.js';
import { verifyCookie } from './helpers/index.js';

// for serverless functions the find() function is a bit different:
// https://www.mongodb.com/developer/languages/javascript/developing-web-application-netlify-serverless-functions-mongodb/
// https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/

export const handler = async (event) => {

	const dbClient = await createClient();

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
		
		// Connect to the database and get a reference to the `users` collection
        await dbClient.connect();
        const properties = dbClient.propertiesCollection();

		// Get all users from MongoDB, excluding password
		const allProperties = await properties.find({}).toArray();
		
		// If no properties
		if (!allProperties?.length) {
			return { statusCode: 400, body: JSON.stringify({ message: 'No properties found' }) };
		}

		return { statusCode: 200, body: JSON.stringify( allProperties ) };

	} catch (err) {
				
		return {
			statusCode: errorStatusCode,
			body: JSON.stringify({ "status code": errorStatusCode, "msg": err.message }),
		}

	} finally {

		dbClient.close();

	}
};