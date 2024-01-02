import jwt from 'jsonwebtoken';
import cookie from 'cookie';

/*
 * Generate a JWT with the user ID and email as the payload,
 * then serialize to a secure HTTP-only cookie.
 */

const createJwtCookie = ( username ) => {

	const refreshToken = jwt.sign(
		{ username: username },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '7d' }
	);


  // Create secure cookie with refresh token
  // Serialize the JWT in a secure http-only cookie
  // process.env.NETLIFY_DEV checked because when developing 
  // app with localhost, it doesn't use https. 
	const jwtCookie = cookie.serialize('jwt', refreshToken, {
		httpOnly: true, //accessible only by web server
		secure: process.env.NETLIFY_DEV !== 'development', //https
		// sameSite: 'Strict', //cross-site cookie
		maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match refreshToken
	});

return jwtCookie;

}

// needed for when user logs out
const clearCookie = () => {
return 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

// needed for when user logs out
const verifyCookie = ( authHeader ) => {

	const unauthorised = {
		status: 401,
		message: 'Unauthorised'
	}

	if (!authHeader?.startsWith('Bearer ')) return unauthorised;

	const token = authHeader.split(' ')[1];

	const verify = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {

			const forbidden = {
				status: 403,
				message: 'Forbidden'
			}

            if (err) return forbidden;

			const verified = {
				status: 200,
				username: decoded.UserInfo.username,
				roles: decoded.UserInfo.roles
			}
            
			return verified;
        }
    )

	return verify;

	}



export { createJwtCookie, clearCookie, verifyCookie }