import {connect, disconnect} from "mongoose"

// Database connection
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL); //MongoDB cloud database connection url
    } catch (error){
        console.log(error)
        throw new Error("Cannot connect to the Database!");
    }
}

// Disconnection Function
async function disconnectToDatabase() {
    try {
        await disconnect();
    } catch (error){
        console.log(error)
        throw new Error("Cannot disconnect to the Database!");
    }
}

export {connectToDatabase, disconnectToDatabase}

