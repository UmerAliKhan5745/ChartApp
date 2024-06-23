import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/usermodel';

export const protect = asyncHandler(async (req: any, res, next) => {
  try {
    let token = req.headers.authorization && req.headers.authorization.startsWith("Bearer")

    if (token) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const userId: any = decoded;
      req.user = await User.findById(userId.id).select('-password');
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});
