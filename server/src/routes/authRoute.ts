import { allUsers } from "../controllers/authContoller/AllUsers";
import { Login } from "../controllers/authContoller/Login";
import { Register } from "../controllers/authContoller/Register";
import { protect } from "../middleware/authverify";
const express =require( 'express')
const Router =express.Router();

Router.post('/register',Register)

Router.post('/login',Login)

Router.get('/search',protect,allUsers)




module.exports=Router;