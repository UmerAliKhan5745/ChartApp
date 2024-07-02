// Import dotenv and configure it to load environment variables from .env
import dotenv from 'dotenv';
import { Server } from "socket.io";
import { createServer } from 'http';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorhandler';
require('./config/db')
// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT ;  // Default to port 3000 if PORT is not defined

// Apply CORS middleware globally
app.use(cors());
app.use(express.json());

// Define routes and middleware
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Mount routes under '/api'
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/chat', require('./routes/chatRoute'));
app.use('/api/message', require('./routes/messageRoute'));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);


// Handle socket connections


// Start the server
const server=app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
  
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket:any) => {
  // console.log("Connected to socket.io");

  socket.on('setup',(userData:any)=>{
    socket.join(userData._id)
    // console.log(userData._id)
    socket.emit('connected')

  })

  socket.on('joinChat',(Room:any)=>{   
    socket.join(Room)
    console.log("user join this room",Room)
  })
  
  socket.on('new message',(newMessageRecived:any)=>{
    let chat =newMessageRecived.chat;
    if(!chat.users) return console.log('user not fround');
    chat.users.forEach((user:any) => {
      if(user._id == newMessageRecived.sender._id) return;
      socket.in(user._id).emit('message received',newMessageRecived)
      
    });
  })
  });