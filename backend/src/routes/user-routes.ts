import {Router} from "express" ;
import { getAllUsers, userSignup, userLogin } from "../controllers/user-controller.js";
import { validate, loginValidator, signupValidator } from "../utils/validators.js";

// User Router 
const userRoutes = Router();

// User Route URLs
userRoutes.get("/", getAllUsers); // "/api/v1/user/"
userRoutes.post("/signup", validate(signupValidator), userSignup) // "/api/v1/user/signup"
userRoutes.post("/login", validate(loginValidator), userLogin) // "/api/v1/user/login"

export default userRoutes;