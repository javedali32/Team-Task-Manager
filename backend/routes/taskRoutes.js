const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

router.post("/add", async(req,res)=>{

try{

const {title} = req.body;

const newTask = new Task({
title
});

await newTask.save();

res.status(201).json({
message:"Task added"
});

}

catch(error){

res.status(500).json({
message:"Server Error"
});

}

});

router.get("/all", async(req,res)=>{

try{

const tasks = await Task.find();

res.json(tasks);

}

catch(error){

res.status(500).json({
message:"Server Error"
});

}

});

router.put("/complete/:id", async(req,res)=>{

try{

await Task.findByIdAndUpdate(
req.params.id,
{
status:"Completed"
}
);

res.json({
message:"Task completed"
});

}

catch(error){

res.status(500).json({
message:"Server Error"
});

}

});

router.delete("/delete/:id", async(req,res)=>{

try{

await Task.findByIdAndDelete(
req.params.id
);

res.json({
message:"Task deleted"
});

}

catch(error){

res.status(500).json({
message:"Server Error"
});

}

});

module.exports = router;