import React from 'react'
import { Link, useLocation, useNavigate  } from 'react-router-dom'


export const Navbar = (props) => {
    let location = useLocation();
    let navigator = useNavigate();
    // useEffect(()=>{
    //     console.log(location);
    // },[location])
    const logOut = ()=>{
        localStorage.removeItem("token");
        props.showAlert("Logged Out","success")
        navigator('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link >
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link >
                            </li>
                        </ul>
                        {!localStorage.getItem("token")?<form className="d-flex" role="search">
                                <Link to="/login" className="btn btn-outline-primary mx-3">Login</Link>
                                <Link to="/signup" className="btn btn-outline-primary mx-3">Sign Up</Link>
                        </form>:<button onClick={logOut} className="btn btn-outline-primary mx-3">Log out</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
