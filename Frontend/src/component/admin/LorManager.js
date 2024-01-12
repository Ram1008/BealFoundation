import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
const LorManager = () => {
    const host = "http://localhost:5000";
    const [details, setDetails] = useState(null);
    // mail this details 
    const [formDetails, setFormDetails] = useState({internId:"", lor:""})
    const handleOnChange =(e)=>{
        setFormDetails ({...formDetails, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`${host}/api/v2/intern/getDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: formDetails.internId})
            });
            const json = await response.json();
            setDetails(json)
            toast.success("LOR has been sent to the recipent email Id");
        }
        catch (err) {
          toast.error("No Intern Found");
        }
        
    }
  return (
    
        <div className="container py-5 " style={{"height": "80.5vh"}}>
            <div className="row d-flex justify-content-center align-items-center h-90">
            <div className="col col-xl-8">
                <div className="card" style={{"borderRadius": "1rem"}}>
                <div className="row g-1">
                    
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    
                    <div className="card-body p-4 p-lg-5 text-black">
                        
                            <form onSubmit={handleSubmit}>

                            <div className="d-flex align-items-center mb-3 pb-1">
                                <i className="fas fa-cubes fa-2x me-3" style={{"color": "#ff6219"}}></i>
                                <span className="h3 fw-bold mb-0">Letter of Recommendation</span>
                            </div>

                            <div className="form-outline mb-4">
                            <div className='d-flex flex-row ' style = {{border:"2px solid gray", borderRadius:"10px"}}>
                                <h2 className=' form-control ' style={{width:"30%", border:"none"}}><strong>BEAL/2020/</strong></h2>
                                
                                <input type="text" value={formDetails.internId} style={{ border:"none"}} name="internId" onChange={handleOnChange} className="form-control form-control-sm" />
                                </div>
                                <label className="form-label" htmlFor="form2Example27">Intern ID</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input onChange={handleOnChange} type='file' value={formDetails.lor}  name= "lor"/><br/>
                                <label>Upload LOR</label>
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
  )
}

export default LorManager