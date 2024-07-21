import {Router} from "express" ;
import { getAllUsers, userSignup, userLogin } from "../controllers/user-controller.js";
import { validate, loginValidator, signupValidator } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers); //api/v1/user/

userRoutes.post("/signup", validate(signupValidator), userSignup) //api/v1/user/signup
userRoutes.post("/login", validate(loginValidator), userLogin) //api/v1/user/signup

export default userRoutes;