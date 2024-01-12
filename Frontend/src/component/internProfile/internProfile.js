import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer"
import Header from "../Header"
const InternProfile = () => {
    const [internId, setInternId] = useState("");
    const [showProfile, setShowProfile] = useState(false);
    const [details, setDetails] = useState(null);
    const host = "http://localhost:5000";
    const handleOnChange =(e)=>{
        const value = e.target.value
        setInternId (value.slice(-4));
    }
    const handleSubmit =  async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`${host}/api/v2/intern/getDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: internId})
            });
            const json = await response.json();
            setDetails(json)
            setShowProfile(true);
        }
        catch (err) {
          toast.error("No Intern Found");
        }
        
    }
  return (
    <div>
        {    showProfile? <div style={{ height: "100vh",  }}>   
            <div
                className="mt-5"
                style={{
                height: "100%",
                backgroundColor: "#9A616D",
                borderRadius: "12px",
                }}
            >
        <Header/>
                <div className="card w-50 mx-auto mt-2" >
                <img
                    className="card-img-top mb-5"
                    src={details.profilePhoto}
                    alt=""
                    style={{ backgroundSize: "cover", height: "210px" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{details.name}</h5>
                    <p className="card-text">Intern ID: BEAl/2020/{details.internID}</p>
                    <p className="card-text">Email: {details.email}</p>
                    <p className="card-text">Phone: {details.phoneNumber}</p>
                    <p className="card-text">Start date: {details.startDate}</p>
                    <p className="card-text">End date: {details.endDate}</p>
                    <p className="card-text">LinkedIn: {details.linkedinProfile}</p>
                    <p className="card-text">Instagram: {details.instagramId}</p>
                </div>
                </div>
                <div style={{marginTop : "8px"}}>
                <Footer />
                </div>
            </div>
            </div>
 :
                <section  style= {{'backgroundColor': '#9A616D', height:"96vh"}}>
                    <div className="container py-5 h-90">
                        <Header/>
                        <div className="row d-flex justify-content-center align-items-center h-90 mt-5">
                        <div className="col col-xl-8">
                            <div className="card" style={{"borderRadius": "1rem", height:"50vh"}}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleSubmit}>
                                        <div className="d-flex align-items-center mb-3 pb-1">
                                            <i className="fas fa-cubes fa-2x me-3" style={{"color": "#ff6219"}}></i>
                                            <span className="h3 fw-bold mb-0"> Get Intern Details </span>
                                        </div>
                                        <div className="form-outline mb-4">
                                        <div className='d-flex flex-row ' style = {{border:"2px solid gray", borderRadius:"10px"}}>
                                            <h2 className=' form-control ' style={{width:"30%", border:"none"}}><strong>BEAL/2020/</strong></h2>
                                            
                                            <input type="text" value={internId} style={{ border:"none"}} name="internId" onChange={handleOnChange} className="form-control form-control-sm" />
                                            </div>
                                            <label className="form-label" htmlFor="form2Example27">Intern ID</label>
                                        </div>
                                        <div className="pt-1 mb-4">
                                            <button type = "submit" disabled={internId === ""? true:false} className="btn btn-dark btn-lg btn-block" >Submit</button>
                                        </div>
                                        <ToastContainer/>
                                        </form>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <Footer/>
                    </div>
                </section>
}
    </div>
  );
}

export default InternProfile;