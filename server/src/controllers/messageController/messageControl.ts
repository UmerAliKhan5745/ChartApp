import asyncHandler from "express-async-handler";
import Message from "../../models/messagemodel";
import User from "../../models/usermodel";
import { Chat } from "../../models/chatmodel";

export const allMessages=(asyncHandler(async(req:any,res:any)=>{

try {
    // console.log(req.params.chatId)
    const message=await Message.find({chat:req.params.chatId})
    .populate('sender','name email pic')
    .populate('chat')
    res.status(200).send(message)
} catch (error:any) {
    res.status(400);
    throw new Error(error.message);
    
}
}))



export const sendMessage=(asyncHandler(async(req:any,res:any)=>{

    const {chatId,content}=req.body;
    if(!chatId && !content){
        console.log("pls enter  userId and contect ")
        res.status(400)
    }
    let newMessage={
        sender:req.user.id,
        content:content,
        chat:chatId
    }

try {
    let message=await Message.create(newMessage)

    message= await message.populate('sender','pic name')
    message= await message.populate('chat')
    message= await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
      res.json(message);
    } catch (error:any) {
      res.status(400);
      throw new Error(error.message);
    }
  }))
  