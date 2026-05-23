import { useState } from "react";
import axios from "axios";

function Signup(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const signupUser = async()=>{

try{

const response = await axios.post(

"https://teamtaskmanager-ivory.vercel.app/api/auth/register",

{
name,
email,
password
}

);

alert(response.data.message);

window.location="/";

}

catch(error){

alert("Signup Failed");

console.log(error);

}

};

return(

<div>

<h1>Signup</h1>

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={signupUser}>
Signup
</button>

</div>

)

}

export default Signup;