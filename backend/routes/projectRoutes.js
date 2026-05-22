const express = require("express");

const router = express.Router();

const Project = require("../models/Project");

router.post("/add", async(req,res)=>{

try{

const {name,role} = req.body;

const newProject = new Project({
name,
role
});

await newProject.save();

res.status(201).json({
message:"Project added"
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

const projects = await Project.find();

res.json(projects);

}

catch(error){

res.status(500).json({
message:"Server Error"
});

}

});

module.exports = router;