// @desc Logout
// @route POST /logout
// @access Public - clears cookie if it exists

import { clearCookie } from "./helpers";

export const handler = async (event) => {

    const cookies = event.headers.cookie;

    if (!cookies || cookies.slice(0,3) !== "jwt") { 
        return {
            statusCode: 204, 
            body: JSON.stringify({message: "no content"})
        };
    };

    return {
        statusCode: 200,
        headers: {
            "Set-Cookie": clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Logged out successfully" })
    };

}