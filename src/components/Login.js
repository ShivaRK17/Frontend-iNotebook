import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
const baseUrl = process.env.REACT_APP_BASE_URL

const Login = (props) => {
    const [submit, setSubmit] = useState("Submit")
    const [cred, setcred] = useState({email:"",password:""})
    let navigate = useNavigate()

    const handleSubmit = async (e)=>{
        setSubmit("Logging in...")
        e.preventDefault();
        const response = await fetch(`${baseUrl}/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            },
            body:JSON.stringify({email:cred.email,password:cred.password})
        });
        const json = await response.json();
        // console.log(json);
        if(json.success===true){
            //Redirect to home  
            localStorage.setItem('token',json.authToken)
            props.showAlert("Login Successful","success")
            navigate("/")
        }
        else{
            setSubmit("Submit")
            // alert("Invalid Creds")
            props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange = (e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <h2 className='my-4'>Login to Continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" id="email" value={cred.email} name='email' aria-describedby="emailHelp"/>
                        <div id="emailHelp" style={{color:"#222222"}} className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} className="form-control" value={cred.password} name='password' id="password"/>
                </div>
                <h6>Don't have an account? Click <Link to="/signup">here</Link></h6>
                <button type="submit" className="btn btn-primary">{submit}</button>
            </form>
        </div>
    )
}

export default Login