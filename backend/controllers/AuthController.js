const { Meeting } = require("../models/MeetingModel");
const User = require("../models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
module.exports.Signup = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, password:hashedPassword});
    const token = createSecretToken(user._id);
    user.token  = token;
    await user.save();
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User Registered successfully", success: true, user,token:token });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if(!username || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ username });
    if(!user){
      return res.status(statusCodes.UNAUTHORIZED).json({message:'Incorrect password or username' }) 
    }

    const auth = await bcrypt.compare(password,user.password);
    if (!auth) {
      return res.status(StatusCodes.UNAUTHORIZED).json({message:'Incorrect password or username',user }) 
    }
     const token = createSecretToken(user._id);
     user.token = token;
     await user.save();
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true,token:token });
     next()
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
}

module.exports.getUserHistory = async (req,res)=>{
  const {token} = req.query;
  try{
    const user = await User.findOne({token:token});
    const meetings = await Meeting.find({user_id:user.username});

    res.status(StatusCodes.OK).json({meetings})
  }catch(e){
    res.json({message:`Something went wrong ${e}`})
  }
}

module.exports.addToHistory = async (req,res)=>{
  const {token,meeting_code} = req.body;
  try{
    const user = await User.findOne({token:token});
    const newMeeting = new Meeting({
      user_id:user.username,
      meetingCode:meeting_code
    })
    await newMeeting.save();
    res.status(StatusCodes.OK).json({message:'Meeting added to history'})
  }catch(e){
    res.json({message:`Something went wrong ${e}`})
  }
}