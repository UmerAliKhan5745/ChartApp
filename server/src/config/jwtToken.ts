import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id: id.toString() },  process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};
