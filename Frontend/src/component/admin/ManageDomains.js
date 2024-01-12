import React, { useState} from 'react';
import { toast, ToastContainer } from "react-toastify";
import DomainTable from './DomainTable';
const ManageDomains = (props) => {
   
    const [newOption, setNewOption] = useState("");
    const host = "http://localhost:5000";
   
      const handleOnChange =(e)=>{
        setNewOption (e.target.value);
    }
      const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`${host}/api/v2/admin/adddomain`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:newOption})
            });
            const json = await response.json();
            toast.success("Successfully added new domain! Please reload the page");
        }
        catch (err) {
          toast.error("Please reload the page");
        }
    }
    const deleteOption = async (id) =>{
        try {
            const response = await fetch(`${host}/api/v2/admin/deleteDomain/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            toast.success("deleted successfully Plese reload the page")
            // const txt = await response.text();
            }
            catch(err){
              toast.error("Internal server error"+ err);
            }
    }
  return (
    <div className="bg-dark" style={{height: "auto"}}>
    <div className="row d-flex justify-content-center align-items-center">
    <div className="col col-xl-8 mb-2">
        <div className="card" style={{"borderRadius": "1rem"}}>
        <div className="row g-1">
            
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
            
            <div className="card-body p-4 p-lg-5 text-black">
                
                    <form onSubmit={handleSubmit}>

                    <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{"color": "#ff6219"}}></i>
                        <span className="h3 fw-bold mb-0">Add new domain</span>
                    </div>

                    <div className="form-outline mb-4">
                    
                        
                        <input type="text" value={newOption}  name="newOption" onChange={handleOnChange} className="form-control form-control-lg" />
                        </div>
                        <label className="form-label" htmlFor="form2Example27">Domain</label>
                    

                    <div className="pt-1 mb-4">
                        <button type = "submit" className="btn btn-dark btn-lg btn-block" >Submit</button>
                    </div>
                    </form> 
                <ToastContainer />
            </div>
            </div>
        </div>
        </div>
        <DomainTable options={props.options} deleteOption={deleteOption}/>
    </div>
    </div>
</div>
  )
}

export default ManageDomains