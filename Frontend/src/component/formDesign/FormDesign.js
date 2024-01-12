import React, { useState, useEffect } from 'react';
import classes from './FormDesign.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header'; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormDesign = (props) => {
  const [options, setOptions] = useState([]);
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
  const fetchData = async () => {
    try {
      const response = await fetch(`${host}/api/id/fetchid`);
      const data = await response.json();
      props.setDetails ({...props.details,internID:data});
    } catch (err) {
      console.error(err);
      toast.error("InternID could not be generated! Please reload the page")
    }
  };
    const host = "http://localhost:5000";
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const addDetails = async (name, email, startDate, endDate, phoneNumber, linkedinProfile,instagramId, profilePhoto, internID, jobCategory) => {
    try{
    const response = await fetch(`${host}/api/v2/intern/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, startDate, endDate, phoneNumber, linkedinProfile,instagramId, profilePhoto, internID, jobCategory})
    });
    const note = await response.json();
  }catch(e){
    toast.error("Form could not be submitted! Please fill all the details")
  }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    addDetails(props.details.name, props.details.email, props.details.startDate, props.details.endDate, props.details.phoneNumber,props.details.linkedinProfile,props.details.instagramId, props.details.profilePhoto, props.details.internID, props.details.jobCategory);
    navigate('/docs');
  };

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const onChange =(e)=>{
    const inputType = e.target;
    if (inputType.type === 'file') {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      props.setDetails ({...props.details, profilePhoto: imageUrl})
    } else {
      props.setDetails ({...props.details, [e.target.name]: e.target.value})
    }
  }
  const steps = [
    {
      id: 'account',
      title: 'Intern Info',
      fields: [
        {
          name: 'name',
          type: 'text',
          value: `${props.details.name}`,
          placeholder: 'Name',
        },
        {
          name: 'email',
          type: 'email',
          value: `${props.details.email}`,
          placeholder: 'Email Id',
        },
        {
          name: 'startDate',
          type: 'date',
          value: `${props.details.startDate}`,
          placeholder: 'Start Date'
        },
        {
          name: 'endDate',
          type: 'date',
          value: `${props.details.endDate}`,
          placeholder: 'End Date'
        },
        {
          name: 'phoneNumber',
          type: 'text',
          value: `${props.details.phoneNumber}`,
          placeholder: 'Contact number',
        },
        {
          name: 'jobCategory',
          type: 'select',
          value: props.details.jobCategory,
          placeholder: 'Job Category',
         
        }
      ],
    },
    {
      id: 'personal',
      title: 'Personal Info',
      fields: [
        {
          name: 'linkedinProfile',
          
          value: `${props.details.linkedinProfile}`,
          placeholder: 'Linkedin Profile ',
        },
        {
          name: 'instagramId',
          type: 'text',
          value: `${props.details.instagramId}`,
          placeholder: 'Instagram Id',
        },
        {
          name: 'profilePhoto',
          type: 'file',
          value: `${props.details.profilePhoto}`,
          placeholder: 'Profile photo',
        },
      ],
    },
    {
      id: 'confirmation',
      title: 'Confirm details',
      fields: [
        
        {
          name: 'profilePhoto',
          value: `${props.details.profilePhoto}`,
          label: 'Profile Photo'
        },
        {
          name: 'name',
          value: `${props.details.name}`,
          label: 'Name '
        },
      {
        name: 'email',
        value: `${props.details.email}`,
        label : 'Email '
        },
      {
        name: 'startDate',
        value: `${props.details.startDate}`,
        label: 'Start Date '
      },
      {
        name: 'endDate',
        value: `${props.details.endDate}`,
        label: 'End Date '
      },
      {
        name: 'phoneNumber',
        value: `${props.details.phoneNumber}`,
        label: 'Phone Number '
      },
      {
        name: 'linkedinProfile',
        value: `${props.details.linkedinProfile}`,
        label: 'Linkedin Profile '
      },
      {
        name: 'instagramId',
        value: `${props.details.instagramId}`,
        label: 'Instagram Profile '
      },
      {
        name:'jobCategory',
        value: `${props.details.jobCategory}`,
        label: 'Job Category '

      },
        ]
      }
      
  ];
  useEffect(() => {
    fetchOptions();
    fetchData();
  }, []);
  return (
    <div className='' style={{"backgroundImage": `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')`,"height": "100vh"}} >
      <Header/>
      <div className={`mask d-flex align-items-center ${classes.gradientCustom3} `}>
      <div className="container">
      <div className="row d-flex justify-content-center align-items-center mx-auto ">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6" >
        <div className="card mt-2 p-2" style={{"borderRadius": "15px", "width": "35vw", "height":"91vh ", "padding":"3px 20px 3px 20px"}} >
        <div className="card-body " style={{"height":"30vh" }}>
              <h3 className="text-uppercase text-center mb-2 ">Intern Form</h3>

              <form  onSubmit={handleSubmit} >
              <ul className={`${classes.progressbar}`} id={[classes.progressbar]}>
                  {steps.map((step, index) => (
                    <li
                      key={index}
                      id={step.id}
                      className={activeStep === index ? classes.active : ''}
                    >
                      <strong>{step.title}</strong>
                    </li>
                  ))}
              </ul>
                <div className=" d-flex flex-column form-outline mb-5" style={{"height":"400px"}}>
                  {steps[activeStep].fields.map((field,index) => (
                    <div key={index} >
                          {activeStep === 2 ? (
                            <>
                            {field.name === "profilePhoto" ?
                            <img
                            className="card-img-top mb-5"
                            src={field.value}
                            alt=""
                            style={{ backgroundSize: "cover", height: "180px", width:"280px", borderRadius:"10px"}}
                        />:(
                                <>
                                {field.name === "name" ?
                                (
                                  <h5 className="card-title">{field.value}</h5>
                                ):(
                                  <p className="card-text">{field.label}: {field.value}</p>)
}

                                </>
                        )
                            } 
                                </>
                          ) : (
                              <>
                                 {field.type === 'select' ? (
                                    <div>
                                      
                                      <select
                                        name={field.name}
                                        value={props.details.jobCategory}
                                        onChange={onChange}
                                        className="form-control form-control-lg"
                                      >
                                        <option value=""></option>
                                        {options.length>0 ?options.map((option) => (
                                          <option key={option.name} value={option.name}>
                                            {option.name}
                                          </option>
                                        )) : null}
                                      </select>
                                      <label htmlFor={field.name}>{field.placeholder}</label>
                                    </div>
                                  ) 
                               : (
                                <> 
                                  <input
                                      key={index}
                                      type={field.type}
                                      name={field.name}
                                      placeholder=""
                                      className="form-control form-control-lg"
                                      onChange = {onChange}
                                      required
                                  />
                          
                                  <label className="form-label" htmlFor="form3Example1cg">{field.placeholder}</label>
                                  </>
                                  )}
                              </>
                          )}
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center">
                  {activeStep !== 0 && (
                    <button
                      type="button"
                      className={`btn btn-success btn-block btn-lg ${classes.gradientCustom4} mx-2 `}
                      onClick={previousStep}
                    >
                      Previous
                    </button>
                  )}
                  {activeStep !== steps.length - 1 && (
                    <button
                      type="button"
                      className={`btn btn-success btn-block btn-lg ${classes.gradientCustom4} mx-2 `}
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <button
                      type="submit"
                      className={`btn btn-success btn-block btn-lg ${classes.gradientCustom4} mx-2`}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )}
  export default FormDesign
      