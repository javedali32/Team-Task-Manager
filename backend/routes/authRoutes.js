const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");

router.post("/signup", async(req,res)=>{

try{

const {name,email,password} = req.body;

const existingUser = await User.findOne({email});

if(existingUser){

return res.status(400).json({
message:"User already exists"
});

}

const hashedPassword = await bcrypt.hash(password,10);

const newUser = new User({
name,
email,
password:hashedPassword
});

await newUser.save();

res.status(201).json({
message:"Signup successful"
});

}

catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});

}

});

router.post("/login", async(req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){

return res.status(400).json({
message:"User not found"
});

}

const isMatch = await bcrypt.compare(
password,
user.password
);

if(!isMatch){

return res.status(400).json({
message:"Wrong password"
});

}

res.status(200).json({
message:"Login successful"
});

}

catch(error){

res.status(500).json({
message:"Server Error"
});

}

});

router.get("/test",(req,res)=>{
res.send("Auth working");
});

module.exports = router;