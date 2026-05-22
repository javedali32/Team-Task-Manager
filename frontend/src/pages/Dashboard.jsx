import { useState,useEffect } from "react";
import axios from "axios";

import "./Dashboard.css";

function Dashboard(){

const [title,setTitle] = useState("");
const [tasks,setTasks] = useState([]);

const [projectName,setProjectName] = useState("");
const [projects,setProjects] = useState([]);

const getTasks = async()=>{

const response = await axios.get(
"/api/task/all"
);

setTasks(response.data);

};

const getProjects = async()=>{

const response = await axios.get(
"/api/project/all"
);

setProjects(response.data);

};

const addProject = async()=>{

const response = await axios.post(

"/api/project/add",

{
name:projectName,
role:"Admin"
}

);

alert(response.data.message);

setProjectName("");

getProjects();

};

const addTask = async()=>{

const response = await axios.post(

"/api/task/add",

{
title
}

);

alert(response.data.message);

setTitle("");

getTasks();

};

const completeTask = async(id)=>{

await axios.put(

`/api/task/complete/${id}`

);

getTasks();

};

const deleteTask = async(id)=>{

await axios.delete(

`/api/task/delete/${id}`

);

getTasks();

};

const logout=()=>{

window.location="/";

};

useEffect(()=>{

getTasks();
getProjects();

},[]);

const pendingTasks=
tasks.filter(
task=>task.status==="Pending"
).length;

const completedTasks=
tasks.filter(
task=>task.status==="Completed"
).length;

return(

<div className="container">

<div className="card">

<h1>Dashboard</h1>

<button onClick={logout}>
Logout
</button>

<h3>
Projects : {projects.length}
</h3>

<h3>
Pending : {pendingTasks}
</h3>

<h3>
Completed : {completedTasks}
</h3>

</div>

<div className="card">

<h2>Add Project</h2>

<input
type="text"
placeholder="Project name"
value={projectName}
onChange={(e)=>setProjectName(e.target.value)}
/>

<button onClick={addProject}>
Add Project
</button>

</div>

<div className="card">

<input
type="text"
placeholder="Enter task"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<button onClick={addTask}>
Add Task
</button>

<h2>Task List</h2>

{
tasks.map((task,index)=>(

<div key={index} className="task">

<p>
{task.title}
-
{task.status}
</p>

<div>

<button
onClick={()=>completeTask(task._id)}
>
Complete
</button>

<button
onClick={()=>deleteTask(task._id)}
>
Delete
</button>

</div>

</div>

))
}

</div>

</div>

)

}

export default Dashboard;