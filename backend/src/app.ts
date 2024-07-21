import express from 'express';
import { config } from 'dotenv'
import morgan from 'morgan'
import appRouter from './routes/index.js';

config();

// Routing Function
const app = express();

// Middlewares for handling requests 
app.use(express.json());

//Remove in production. Error logging package
app.use(morgan("dev"));

// Testing API
// app.get('/', (req, res) => {
//     res.send('hello world')
//   })

app.use("/api/v1", appRouter);

export default app;