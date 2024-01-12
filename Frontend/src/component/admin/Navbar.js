import React from 'react'
import logo from "../../Assets/logo.jpeg"
import "bootstrap-icons/font/bootstrap-icons.css";

import { useNavigate } from 'react-router-dom';
const Navbar = (props) => {
    
  const navigate = useNavigate();
    const handleLogOut = () =>{
        localStorage.removeItem('token');
        navigate("/login")
    }
    const handleLOR = () =>{
      props.setDState("lor")
    }
    const handleManager = () =>{
      props.setDState("manager")
    }
    const handleHome = () =>{
      props.setDState("dTable")
    }
    const handelDomain = () =>{
      props.setDState("domains")
    }
    const handleDashboard =() =>{
      props.setDState("dashboard")
    }
  return (
    
        <nav className="navbar navbar-dark bg-dark text-white pt-4 pb-4">
            <div className="container">
                
                <img
                    src={logo}
                    height="40"
                    alt="BEAL"
                    loading="lazy"
                    onClick={handleHome}
                    style={{cursor:"pointer"}}
                    className='rounded'
                />
                <div className='h3 '>BEAL FOUNDATION</div>
                <button className='btn btn-outline-light' style={{border:"none"}} onClick = {handleDashboard}><i className="bi bi-speedometer2 mx-1"></i>Dashboard</button>
                <button className='btn btn-outline-light' style={{border:"none"}} onClick = {handelDomain}><i class="bi bi-people mx-1"></i>Manage Domains</button>
                <button className='btn btn-outline-light' style={{border:"none"}} onClick = {handleManager}><i class="bi bi-award-fill mx-1"></i>Admins Manager</button>
                <button className='btn btn-outline-light' style={{border:"none"}} onClick = {handleLOR}><i class="bi bi-file-text mx-1"></i>LOR</button>
                <button className='btn btn-outline-light' style={{border:"none"}} onClick={handleLogOut}><i class="bi bi-box-arrow-left mx-1"></i>Log out</button>
            </div>
        </nav>
   
  )
}

export default Navbar