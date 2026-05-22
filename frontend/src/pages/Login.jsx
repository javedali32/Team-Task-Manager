import { useState } from "react";
import axios from "axios";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const loginUser = async()=>{

try{

const response = await axios.post(

"/api/auth/login",

{
email,
password
}

);

alert(response.data.message);

window.location="/dashboard";

}

catch(error){

alert("Login Failed");

}

};

return(

<div>

<h1>Login</h1>

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

<button onClick={loginUser}>
Login
</button>

</div>

)

}

export default Login;