import React from 'react'
import { useNavigate } from 'react-router-dom';
import loginFormImage from '../../Assets/loginFormImage.jpeg';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = (props) => {
  let navigate = useNavigate();
  const handleOnChange =(e)=>{
      props.setLogin ({...props.login, [e.target.name]: e.target.value})
      
}
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await fetch('http://localhost:5000/api/v2/user/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: props.login.email, password: props.login.password})
      });
      const json = await response.json();
      if(json.success === true) {
          //saving token in local storage
          localStorage.setItem('token' ,json.authtoken)
          //redirect
          navigate("/adminPanel")
          toast.success("Login successful!");
      }
      else{
        toast.error("Invalid username or password.");
      }

  }
  catch (err) {
    toast.error("Invalid username or password.");
  }
  
}
  return (
    <section className="vh-100" style= {{'backgroundColor': '#9A616D'}}>
  <div className="container py-5 h-90">
    <div className="row d-flex justify-content-center align-items-center h-90">
      <div className="col col-xl-10">
        <div className="card" style={{"borderRadius": "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src={loginFormImage}
                alt="login form" className="img-fluid" style={{"borderRadius": "1rem 0 0 1rem"}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form onSubmit={handleSubmit}>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{"color": "#ff6219"}}></i>
                    <span className="h1 fw-bold mb-0">BEAL FOUNDATION</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{"letterSpacing": "1px"}}>Admin login</h5>

                  <div className="form-outline mb-4">
                    <input type="email"  value={props.login.email} name = "email"className="form-control form-control-lg" onChange={handleOnChange}  />
                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password"  value = {props.login.password} name="password" className="form-control form-control-lg" onChange={handleOnChange}/>
                    <label className="form-label" htmlFor="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button type = "submit" className="btn btn-dark btn-lg btn-block" >Submit</button>
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Login