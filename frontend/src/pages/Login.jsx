import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async()=>{

try{

const response = await axios.post(
"http://localhost:5000/api/auth/login",

{
email,
password
}

);

alert(response.data.message);

navigate("/dashboard");

}

catch(error){

alert(error.response.data.message);

}

};

return(

<div>

<h1>Login</h1>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={handleLogin}>
Login
</button>

</div>

)

}

export default Login;