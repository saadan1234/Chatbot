import express from 'express';
import { config } from 'dotenv'
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';

config();

// Routing Functions using express.js
const app = express();

// Middlewares for handling requests 
app.use(express.json());

// Cookie Sessioning
app.use(cookieParser(process.env.COOKIE_SECRET));

// Error logging package. Do not use in production.
app.use(morgan("dev"));

// Testing API
// app.get('/', (req, res) => {
//     res.send('hello world')
//   })

// Basic api versioning.
app.use("/api/v1", appRouter);

export default app;