import express from 'express';
import { protect } from '../middleware/authverify';
import { allMessages, sendMessage } from '../controllers/messageController/messageControl';
export const Router = express.Router();

Router.get('/:chatId',protect,allMessages)

Router.post('/',protect,sendMessage)








module.exports=Router;