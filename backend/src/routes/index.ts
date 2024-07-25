import {Router} from 'express';
import userRoutes from "./user-routes.js"
import chatRoutes from "./chat-routes.js"

// Routes controls
const appRouter = Router();

// Route URLs
appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats

export default appRouter;
