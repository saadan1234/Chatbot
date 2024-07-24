import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

// Validation function using express.
export const validate = (validations: ValidationChain[]) => {
    return async (req:Request, res:Response, next:NextFunction) =>{
        for(let validation of validations){
            const result = await validation.run(req);// Waits for the validation to run of requested objects.
            if(!result.isEmpty()){ // As soon as a validation error is found it breaks.
                break;
            }
        }
            // Returns the error. If no error then goes to the next function.
            const errors = validationResult(req);
            if(errors.isEmpty()){
                return next();
            }
            console.log(errors)
            return res.status(422).json({errors: errors.array()});
            // Returns the unproccessable content error with the error results.
    };
};

// The login Validator includes the email and password checking 
// if email is corrext and password is more then 6 letters.
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min: 6}).withMessage("Password should be more then 6 characters."),
];

// Consists of the name, email and password and checks if the name is not empty.
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
    ];


    
