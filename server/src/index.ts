// Import dotenv and configure it to load environment variables from .env
import dotenv from 'dotenv';
dotenv.config();
require('./config/db')
// Import required modules
import express, { Request, Response } from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorhandler';
; // Import your chat routes

// Create an Express application
const app = express();
const port = process.env.PORT ;

// Apply CORS middleware globally
app.use(cors());
app.use(express.json());

// Define routes and middleware
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Mount chat routes under '/api'
app.use('/api/auth', require('./routes/authRoute'));

app.use('/api/chat', require('./routes/chatRoute'));

app.use('/api/message', require('./routes/messageRoute'));

app.use(notFound);
app.use(errorHandler);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
