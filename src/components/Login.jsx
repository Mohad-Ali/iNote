import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [credintial, setcredintial] = useState({email:"",password:""})
    let navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credintial.email,password:credintial.password}),
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            localStorage.setItem("token",json.token);
            navigate("/");

        }else{
            alert("invalid credintial")
        }
    }
    const handleChance=(e)=>{
        setcredintial({...credintial,[e.target.name]:e.target.value})  
    }

    return (
        <div>
            <form onSubmit={handleSubmit} method='POST'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credintial.email} onChange={handleChance} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credintial.password} onChange={handleChance}  name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
