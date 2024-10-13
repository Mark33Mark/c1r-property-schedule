// @desc Refresh
// @route GET /refresh
// @access Public - refreshes expired access token


import { createClient } from './helpers';
import jwt from 'jsonwebtoken';

export const handler = async (event) => {
	const dbClient = createClient();
    const { cookie } = event.headers;

    const refreshToken = cookie.slice(4);

    try {
        // Connect to the database and get a reference to the `users` collection
        await dbClient.connect();
        const users = dbClient.usersCollection();

        if (!refreshToken ) return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorised' }) };

        const decoded = await jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET );
        const foundUser = await users.findOne({ username: decoded.username });
                
        if (!foundUser) return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorised' }) };

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

        return { statusCode: 200, body: JSON.stringify({ accessToken }) };

    } catch (err) {
        
        return {
        statusCode: errorStatusCode,
        body: JSON.stringify({ "status code": errorStatusCode, "msg": err.message }),
        }

    } finally {

        dbClient.close();

    }
};