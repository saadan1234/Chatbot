import {Router} from "express" ;
import { getAllUsers, userSignup } from "../controllers/user-controller.js";
import { validate, signupValidator } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers); //api/v1/user/

userRoutes.post("/signup", validate(signupValidator), userSignup) //api/v1/user/signup

export default userRoutes;