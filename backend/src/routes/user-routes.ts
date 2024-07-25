import {Router} from "express" ;
import { getAllUsers, userSignup, userLogin, verifyUser } from "../controllers/user-controller.js";
import { validate, loginValidator, signupValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

// User Router 
const userRoutes = Router();

// User Route URLs
userRoutes.get("/", getAllUsers); // "/api/v1/user/"
userRoutes.post("/signup", validate(signupValidator), userSignup) // "/api/v1/user/signup"
userRoutes.post("/login", validate(loginValidator), userLogin) // "/api/v1/user/login"
userRoutes.get("/auth-status",verifyToken, verifyUser);

export default userRoutes;