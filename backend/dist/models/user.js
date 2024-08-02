import mongoose from "mongoose";
import { randomUUID } from "crypto";
// Chat Schema; ID, Role, Content.
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(), //Unique Id to every chat.
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
// User Schema; Name, Email, Password.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email must be unique.
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema], // Chat Schema for the above user.
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=user.js.map