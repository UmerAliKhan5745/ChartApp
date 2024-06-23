import { Request, Response } from 'express';
import User from '../../models/usermodel';
import { generateToken } from '../../config/jwtToken';
import { Types } from 'mongoose';
const asyncHandler = require('express-async-handler');
interface RegisterData {
  name: string;
  email: string;
  password: string; // Use a more specific type
  pic: string;
  _id: Types.ObjectId; // Use ObjectId from mongoose
}

// Assuming Register is a function that processes the registration data.
export const Register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, pic }: RegisterData = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const createUser = await User.create({
    name,
    email,
    password,
    pic
  });

  if (createUser) {
    res.status(201).json({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      pic: createUser.pic,
      token: generateToken(createUser._id)
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});


