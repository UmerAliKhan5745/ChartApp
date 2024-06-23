import express from 'express';
import { protect } from '../middleware/authverify';
import { CreateGroupChat, ReomveToGroup, UpdateGroupName, accessChat ,addToGroup,fetchChat} from '../controllers/chatController/ChatControl';
export const Router = express.Router();

Router.post('/accesschat',protect,accessChat)

Router.post('/fetchchat',protect,fetchChat)

Router.post('/group',protect,CreateGroupChat)

Router.put('/updateGroupName',protect,UpdateGroupName)

Router.put('/addtogroup',protect,addToGroup)

Router.put('/reomvetogroup',protect,ReomveToGroup)







module.exports=Router;