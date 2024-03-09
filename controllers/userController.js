import asyncHandler from 'express-async-handler'; //no need to use try catch block, it will automatically pass error to catch bloack if occur
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    //check if user already exists
    const userAvailable = await userModel.find({email: email});
    //if exists
    if(!userAvailable) {
        res.status(400);
        throw new Error('User already Exists.');
    }
    // if user does not exist, now store the user info into db
    const hashedPassword = await bcrypt.hash(password, 10); //encrypt the password
    const user = new userModel({username: username, email: email, password: hashedPassword});
    await user.save();
    //we don't want to show hashed passowrd to the user, so don't send it as response
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else {
        res.status(400);
        throw new Error('User data is not valid');
    }
});

//@desc Login a user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const user = await userModel.findOne({email});
    //compare password with hashed password
    const comparePasswords = await bcrypt.compare(password, user.password); //here user.password is hashed password
    console.log("Comparison result". comparePasswords);
    if(user && comparePasswords){
        //now provide a access token to the user
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
        res.status(200).json({accessToken});
    }
    else {
        res.status(401);
        throw new Error('Email or Password is wrong');
    }
});

//@desc current user user
//@route get /api/user/current
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
});

export {registerUser, loginUser, currentUser};