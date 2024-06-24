import User from "../../models/usermodel";
import {Chat} from '../../models/chatmodel'
import asyncHandler from "express-async-handler";

export const accessChat = asyncHandler(async (req:any, res:any) => {
const {userId}=req.body;
if(!userId){
    res.status(400).send("userId is not there")
}   
let isChart= await Chat.find({
    isGroupChat:false,
    $and:[
       { users:{$elemMatch:{$eq:req.user._id}}},
       { users:{$elemMatch:{$eq:userId}}}

    ]
}).populate('users','-password').populate('latestMessage');

isChart=await User.populate(isChart,{
    path:"latestMessage.sender",
    select:"pic name email"
})

if(isChart.length>0){
    res.status(200).send(isChart[0])

}else{

    let ChatData={
        chatName:"serder",
        isGroupChat:false,
        users:[req.user._id,userId]
    }
    try {
        let createChat= await Chat.create(ChatData)
        let fullChat= await Chat.findOne({_id:createChat._id}).populate('users','-password')

        res.status(200).json(fullChat);
    } catch (error:any) {
      res.status(400);
      throw new Error(error.message);
    }
  }

});
  
export const fetchChat=asyncHandler(async(req:any,res:any)=>{

    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }) // Find chats where the current user is a participant
        .populate('users',"-password")
        .populate('groupAdmin','-password')
        .populate('latestMessage')
        .sort({updatedAt:-1})
        .then(async (results:any) => {
            results = await User.populate(results, {
              path: "latestMessage.sender",
              select: "name pic email",
            });
            res.status(200).send(results); // Send the results back to the client
          });
    } catch (error:any) {
        res.status(400);
        throw new Error(error.message);
      }   
    })

export const  CreateGroupChat =asyncHandler(async(req:any,res:any)=>{

if(!req.body.user && ! req.body.name){
  return res.status(400).send("pls full the feilds")
}

let users =JSON.parse(req.body.users)
if(users.length<2){
 return res.status(400).send("More than 2 users are required to form a group chat");
}
users.push(req.user);

try {
  const cheateChart =await Chat.create({ 
    chatName:req.body.name,
    isGroupChat:true,
    users:users,
    groupAdmin:req.user})
  
const fullChat= await Chat.find({_id:cheateChart._id})
.populate("users","-password")
.populate("groupAdmin","-passsword")

return res.status(200).json(fullChat)

} catch (error:any) {
  res.status(400);
  throw new Error(error.message);
}


})     

export const UpdateGroupName=asyncHandler(async(req:any,res:any)=>{
const {chatId,chatName}=req.body;
const updatedChat=await Chat.findByIdAndUpdate(
  chatId,{
    chatName
  },{
    new:true
  }).populate('users','-password')
  .populate('groupAdmin','-password')

  if(!updatedChat){
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
})

export const addToGroup = (asyncHandler(async (req: any, res: any) => {
  const { chatId, userId } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    if (!updatedChat) {
      throw new Error('User not found');
    }

    res.status(200).send(updatedChat);
  } catch (error:any) {
    res.status(404).send({ message: error.message });
  }
}));

export const ReomveToGroup=(asyncHandler(async(req:any,res:any)=>{
  const {chatId,userId}=req.body
  const remove=await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull:{users:userId }

    },
      {
        new:true
      }
    
  ).populate('users','-password')
  .populate('groupAdmin','-password')

  if(!remove){
    res.status(404)
    throw new Error("user not frond")
  }else
  res.status(200).send(remove)
})) 