import jwt from "jsonwebtoken";

// JWT Tokens for user authentication using id and email.
export const createToken = ( id: string, email: string, expiresIn ) => {
    // Id and email, expires in set to 7 days.
    const payload = {id, email};
    // Sign in using the token. Payload and expiresIn are checked.
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn ,
    });
    return token;
};
