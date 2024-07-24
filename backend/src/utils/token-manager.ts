import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { resolve } from "path";
import { rejects } from "assert";

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

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies['${COOKIE_NAME}'];
    if(!token || token.trim()=== ""){
        return res.status(401).json({message: "Token not recieved"})
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success)=>{
            if(err){
                reject(err.message);
                return res.status(401).json({message:"Token expired"});
            }else {
                console.log("Token Verification Successful");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
}