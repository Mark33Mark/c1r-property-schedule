// @desc New User register
// @route POST /register
// @access Public

import argon2 from 'argon2';
import { createClient } from './helpers/db-helper.js';

export const handler = async (event) => {

    const dbClient = createClient();    
    const { username, password } = event.body;
    let errorStatusCode = 500;

    try {
        // Connect to the database and get a reference to the `users` collection
        await dbClient.connect();
        const users = dbClient.usersCollection();

        // Confirm data
        if (!username || !password) {
            return  { statusCode: 400, body: JSON.stringify({ message: 'All fields are required' }) };
        }

        // Check for duplicate username
        const duplicate = await users.findOne({ username })
            .collation({ locale: 'en', strength: 2 })
            .lean();

        if (duplicate) {
            return { statusCode: 409, body: JSON.stringify({ message: 'Duplicate username' }) };
        }

        // Hash password
        // Argon2 recommends against over-riding its default salt rounds
        const hashedPwd = await argon2.hash(password);
        const userObject = { username, password: hashedPwd, roles: 'Employee' };

        // Create and store new user
        const newUser = await users.create(userObject);

        if (newUser) {
            //created
            return { statusCode: 201, body: JSON.stringify({ message: `New user ${username} created` }) };
        } else {
            return { statusCode: 400, body: JSON.stringify({ message: 'Invalid user data received' }) };
        }

    } catch (err) {
        
        return {
        statusCode: errorStatusCode,
        body: JSON.stringify({ "status code": errorStatusCode, "msg": err.message }),
        }

    } finally {

        dbClient.close();

    } 
};
