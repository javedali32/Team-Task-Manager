const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

role:{
type:String,
default:"Member"
}

});

module.exports = mongoose.model(
"Project",
projectSchema
);