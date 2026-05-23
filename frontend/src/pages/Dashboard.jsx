import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){

const API = "https://teamtaskmanager-ivory.vercel.app";

const [projectName,setProjectName] = useState("");
const [title,setTitle] = useState("");

const [projects,setProjects] = useState([]);
const [tasks,setTasks] = useState([]);

useEffect(()=>{

getProjects();
getTasks();

},[]);

const getProjects = async()=>{

try{

const response = await axios.get(
`${API}/api/project/all`
);

setProjects(response.data);

}

catch(error){

console.log(error);

}

};

const getTasks = async()=>{

try{

const response = await axios.get(
`${API}/api/task/all`
);

setTasks(response.data);

}

catch(error){

console.log(error);

}

};

const addProject = async()=>{

try{

const response = await axios.post(
`${API}/api/project/add`,
{
name:projectName
}
);

alert(response.data.message);

setProjectName("");

getProjects();

}

catch(error){

alert("Project add failed");

}

};

const addTask = async()=>{

try{

const response = await axios.post(
`${API}/api/task/add`,
{
title
}
);

alert(response.data.message);

setTitle("");

getTasks();

}

catch(error){

alert("Task add failed");

}

};

const completeTask = async(id)=>{

await axios.put(
`${API}/api/task/complete/${id}`
);

getTasks();

};

const deleteTask = async(id)=>{

await axios.delete(
`${API}/api/task/delete/${id}`
);

getTasks();

};

return(

<div>

<h1>Dashboard</h1>

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

<h3>Projects</h3>

{projects.map((project,index)=>(

<div key={index}>

{project.name}

</div>

))}

<hr/>

<h2>Add Task</h2>

<input
type="text"
placeholder="Task title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<button onClick={addTask}>
Add Task
</button>

<h3>Tasks</h3>

{tasks.map((task)=>(

<div key={task._id}>

{task.title}

<button onClick={()=>
completeTask(task._id)
}>
Complete
</button>

<button onClick={()=>
deleteTask(task._id)
}>
Delete
</button>

</div>

))}

</div>

)

}

export default Dashboard;