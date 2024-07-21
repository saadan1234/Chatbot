import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

// Connections and Listeners
connectToDatabase().then(()=>{
  app.listen(PORT, ()=>console.log('Server Open and Database Connected!'));
})
.catch((err)=> console.log(err));
