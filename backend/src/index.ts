import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// Default port to set the dev environment if not found uses port 5000
const PORT = process.env.PORT || 5000;

// Connections and Listeners

// If the Database connection works then starts the port 5000. 
// After successful server start it returns the conformation message
connectToDatabase().then(()=>{
  app.listen(PORT, ()=>console.log('Server Open and Database Connected!'));
})
.catch((err)=> console.log(err));
