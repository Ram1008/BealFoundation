import React,{useState, useEffect} from 'react'
import { toast, ToastContainer } from "react-toastify";
import AdminTable from './AdminTable';
const AdminManager = () => {
    const initialValue = [];
    const [details, setDetails] = useState(initialValue)
    const [formDetails, setFormDetails] = useState({name:"",email:"", password:"", cnfPassword:"" });
    const handleOnChange =(e)=>{
        setFormDetails ({...formDetails, [e.target.name]: e.target.value});
    }
    const getDetails = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/v2/user/all', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const json = await response.json();
          setDetails(json);
          
       }
      catch (err) {
        toast.error("Internal server error"+ err);
      }
      };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/v2/user/createAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:formDetails.name, email:formDetails.email, password:formDetails.password})
            });
            const json = await response.json();
            toast.success("Successfull Plese reload the page")
        }
        catch (err) {
          toast.error("No Intern Found");
        }
    }
    const deleteUser = async (id) => {
        // API Call
        try {
        const response = await fetch(`http://localhost:5000/api/v2/user/delete/${id}`, {
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
    useEffect(() => {
        
        getDetails();
      }, []);
  return (
    <div className="bg-dark" style={{height: "auto"}}>
    <div className="row d-flex justify-content-center align-items-center ">
    <div className="col col-xl-8">
        <div className="card" style={{"borderRadius": "1rem"}}>
        <div className="row g-1">
            
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
            
            <div className="card-body p-4 p-lg-5 text-black">
                
                    <form onSubmit={handleSubmit}>

                    <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{"color": "#ff6219"}}></i>
                        <span className="h3 fw-bold mb-0">Add new admin</span>
                    </div>

                    <div className="form-outline mb-2">
                        <input type="name" id="form1Example0" className="form-control" name="name" value={formDetails.name} onChange={handleOnChange} />
                        <label className="form-label" htmlFor="form1Example">Name</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input type="email" id="form1Example1" className="form-control" name="email" value={formDetails.email} onChange={handleOnChange} />
                        <label className="form-label" htmlFor="form1Example1">Email address</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input type="password" id="form1Example2" className="form-control" name="password" value={formDetails.password} onChange={handleOnChange}/>
                        <label className="form-label" htmlFor="form1Example2">Password</label>
                      </div>
                      <div className="form-outline mb-2">
                        <input type="password" id="form1Example3" className="form-control" name="cnfPassword" value={formDetails.cnfPassword} onChange={handleOnChange}/>
                        <label className="form-label" htmlFor="form1Example2">Confirm Password</label>
                      </div>
                      <button type="submit"  className="btn btn-outline-dark btn-block">Create Admin</button>
                    </form> 
                    
                
                <ToastContainer />
                
            </div>
            </div>
        </div>
        </div>
        <AdminTable details= {details} deleteUser= {deleteUser}/>
    </div>
    </div>
</div>
    
  )
}

export default AdminManager