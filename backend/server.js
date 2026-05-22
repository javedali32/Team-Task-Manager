require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/project", projectRoutes);

app.get("/", (req,res)=>{
res.send("Backend running");
});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
console.log("MongoDB Connected");
})
.catch((err)=>{
console.log(err);
});

app.listen(process.env.PORT, ()=>{
console.log("Server started");
});