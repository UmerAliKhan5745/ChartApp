import { Request, Response } from 'express';
import User from '../../models/usermodel';
import { Types } from 'mongoose';
import { generateToken } from '../../config/jwtToken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

interface RegisterData {
  email: string;
  password: string;
  _id: Types.ObjectId;
}

export const Login = asyncHandler(async (req: any, res: any) => {
  const { email, password }: RegisterData = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Try to login with correct credentials");
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (checkPassword) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
