import User from "../../models/usermodel";

const asyncHandler = require("express-async-handler");

export const allUsers = asyncHandler(async (req:any, res:any) => {
  console.log(req.user )
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });