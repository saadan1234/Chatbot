import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// Gets all the user
export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await User.find(); // Finds all the users in the User exported from the model.
        return res.status(201).json({message:"OK", users});
    } catch (error) {
        return res.status(200).json({message:"ERROR", cause: error.message});
    }
};

// User Signup
export const userSignup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        // Gets the user model.
        const {name, email, password} = req.body; 

        // Checks for the user with the same email and responds if it exists or not.
        const existingUser = await User.findOne({email}); 
        if(existingUser) return res.status(401).send("User already exists");

        // Password encryption for storage.
        const hashedPassword = await hash(password, 10);
        const user = new User({name, email, password:hashedPassword});
        await user.save();

        // Setting current date for the token.
        const expires = new Date();
        expires.setDate(expires.getDate()+7);

        // Clear existing cookies.
        res.clearCookie(COOKIE_NAME, {path: "/", domain: "localhost", httpOnly: true, signed: true});

        // Creates a new cookie and token.
        const token = createToken(user._id.toString(), user.email, "7d");
        res.cookie(COOKIE_NAME, token, {path: "/", domain: "localhost", expires, httpOnly: true, signed: true});
        return res.status(200).json({message:"OK", name: user.name, email: user.email});
    } catch (error) {
        return res.status(200).json({message:"ERROR", cause: error.message});
    }
};

export const userLogin = async (req:Request, res:Response, next:NextFunction) => {
    //User Login
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(401).send("User not registered.");
        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect) return res.status(403).send("Incorrect Password");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);

        res.clearCookie(COOKIE_NAME, {path: "/", domain: "localhost", httpOnly: true, signed: true});

        const token = createToken(user._id.toString(), user.email, "7d");
        res.cookie(COOKIE_NAME, token, {path: "/", domain: "localhost", expires, httpOnly: true, signed: true});

        return res.status(200).json({message:"OK", name: user.name, email: user.email});
    } catch (error) {
        return res.status(200).json({message:"ERROR", cause: error.message});
    }
};