import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import DisplayTable from './DisplayTable';
import Lor from "./LorManager";
import AdminManager from "./AdminManager";
import Footer from "./AdminFooter";
import ManageDomains from './ManageDomains';
import Dashboard from './Dashboard';
import EditIntern from './EditIntern';
const AdminPanel = () => {
  const navigate = useNavigate();
  const initialOptions = [];
  const [options, setOptions] = useState(initialOptions);
  const initialDetails = [];
  const [details, setDetails] = useState(initialDetails);
  const [editDetails, setEditDetails] = useState({id:"",name :"", email : "", startDate : "", endDate : "", phoneNumber : "", linkedinProfile : "",instagramId : "", profilePhoto : null, internID : "", jobCategory: ""});
  const [dState, setDState] = useState("dTable");
  const [editId, setEditId] = useState();
  const host = "http://localhost:5000";
  
  const fetchOptions = async () =>{
    try {
      const response = await fetch(`${host}/api/v2/admin/fetchalldomains`);
      const data = await response.json();
      setOptions (data);
    } catch (err) {
      console.error(err);
      toast.error("Please reload the page")
    }
  }
  const deleteIntern = async (id) => {
    
    try {
    const response = await fetch(`${host}/api/v2/intern/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    toast.success("deleted successfully")
    const txt = await response.text();
    }
    catch(err){
      toast.error("Internal server error"+ err);
    }
    
  }
  const editClick = (id) =>{
    setEditId(id);
    const oldDetail = details.filter((detail) => detail._id === id)
    setEditDetails({id: oldDetail[0]._id,name :oldDetail[0].name, email : oldDetail[0].email, startDate : oldDetail[0].startDate, endDate : oldDetail[0].endDate, phoneNumber : oldDetail[0].phoneNumber, linkedinProfile : oldDetail[0].linkedinProfile,instagramId : oldDetail[0].instagramId, profilePhoto : oldDetail[0].profilePhoto, internID : oldDetail[0].internID, jobCategory: oldDetail[0].jobCategory })
    setDState("edit");
  }
  const editIntern = async (id, name, email, startDate, endDate, phoneNumber, linkedinProfile, instagramId, profilePhoto, internID, jobCategory) => {
    

    const response = await fetch(`${host}/api/v2/intern/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ name, email, startDate, endDate, phoneNumber, linkedinProfile, instagramId, profilePhoto, internID, jobCategory })
    });
    
    

    let newDetails = JSON.parse(JSON.stringify(details));
    for (let index = 0; index < newDetails.length; index++) {
      const element = newDetails[index];
      if (element._id === id) {
        newDetails[index].name = name;
        newDetails[index].email = email;
        newDetails[index].startDate = startDate;
        newDetails[index].endDate = endDate ;
        newDetails[index].phoneNumber = phoneNumber;
        newDetails[index].linkedinProfile = linkedinProfile;
        newDetails[index].instagramId = instagramId;
        newDetails[index].profilePhoto = profilePhoto;
        newDetails[index].internID = internID ;
        newDetails[index].jobCategory = jobCategory;
        break;
      }
      setDetails(newDetails);

    }
    
    
  }
  const component = () =>{
    if(dState === "dTable"){
      return(
        <>
          
        <DisplayTable details= {details} deleteIntern={deleteIntern} editClick={editClick}/>
        <Footer mode='dark'/>        
        </>
      )
    }
    else if(dState ==="lor"){
      return (
        <>
          <Lor/>
        </>
      )
    }
    else if(dState === "domains") {
      return (
        <ManageDomains options={options} details={details}/>
      )
    }
    else if(dState === "edit") {
      return ( 
        <EditIntern setDState={setDState} options={options} details={details} editIntern={editIntern} editId={editId} editDetails={editDetails} setEditDetails={setEditDetails}/>
      )
    }
    else if(dState === "dashboard") {
      return (
        <Dashboard details={details} options={options}/>
      )
    }
    else{
      return (
        <AdminManager/>
      )
    }
  }
  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(`${host}/api/v2/intern/all`, {
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
    fetchOptions();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getDetails();
    }
  }, []);

  return <div className='bg-dark text-white' style={{height:"100vh"}}>
    
    <Navbar setDState={setDState} />
    {component()}
    <ToastContainer/>
  </div>;
};

export default AdminPanel;
