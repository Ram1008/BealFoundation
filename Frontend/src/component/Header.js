import React from 'react';
import logo from '../Assets/logo.jpeg'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const handleHome = () =>{
        navigate("/internProfile")
    }
  return (
    
        <nav className="navbar navbar-light bg-light rounded" >
            <div className="container">
                <img
                    className='rounded'
                    src={logo}
                    height="40"
                    alt="BEAL"
                    loading="lazy"
                    onClick={handleHome}
                    style={{cursor:"pointer"}}
                />
                <div className='h3 mx-auto'><strong>BEAL FOUNDATION</strong></div>
                
            </div>
        </nav>
    
  )
}

export default Header