import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const baseUrl = process.env.REACT_APP_BASE_URL

const Signup = (props) => {
    const [submit, setSubmit] = useState("Submit")
    const [cred, setcred] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate()

    const {name,email,password,cpassword} = cred
    const handleSubmit = async (e)=>{
        setSubmit("Creating Account...")
        if(password!==cpassword){
            setSubmit("Submit")
            props.showAlert("Passwords dont match","danger")
        }
        else{
        e.preventDefault();
        const response = await fetch(`${baseUrl}/api/auth/createUser`,{
            method:"POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            },
            body:JSON.stringify({name,email,password})
        });
        const json = await response.json();
        // console.log(json);
        if(json.success){
            //Redirect to home  
            localStorage.setItem('token',json.authToken)
            navigate("/")
            props.showAlert("Created New Account Successfully","success")  
        }
        else{
            setSubmit("Submit")
            // alert("Invalid Creds")
            props.showAlert("Account Already exists","danger")  
        }
    }
    }

    const onchange = (e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container m-3">

            <h2>Create an Account to Continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" required className="form-control" name='name' id="name" onChange={onchange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" required className="form-control" name='email' id="email" onChange={onchange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" required className="form-control" onChange={onchange} name='password' id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" required className="form-control" onChange={onchange} name='cpassword' id="cpassword"/>
                </div>
                <button type="submit" className="btn btn-primary">{submit}</button>
            </form>

            </div>
        </div>
    )
}

export default Signup