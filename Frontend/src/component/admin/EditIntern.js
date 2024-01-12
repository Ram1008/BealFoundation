import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../formDesign/FormDesign.module.css"
const EditIntern = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const handleSubmit = (event) => {
        event.preventDefault();
        props.editIntern(props.editDetails.id, props.editDetails.name, props.editDetails.email, props.editDetails.startDate, props.editDetails.endDate, props.editDetails.phoneNumber,props.editDetails.linkedinProfile,props.editDetails.instagramId, props.editDetails.profilePhoto, props.editDetails.internID, props.editDetails.jobCategory);
        toast.success("Details updated successfully!")
        props.setDState("dTable");
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
          props.setEditDetails ({...props.editDetails, profilePhoto: imageUrl})
        } else {
          props.setEditDetails ({...props.editDetails, [e.target.name]: e.target.value})
        }
      };
      const steps = [
        {
          id: 'account',
          title: 'Intern Info',
          fields: [
            {
              name: 'name',
              type: 'text',
              value: `${props.editDetails.name}`,
              placeholder: 'Name',
            },
            {
              name: 'email',
              type: 'email',
              value: `${props.editDetails.email}`,
              placeholder: 'Email Id',
            },
            {
              name: 'startDate',
              type: 'date',
              value: `${props.editDetails.startDate}`,
              placeholder: 'Start Date'
            },
            {
              name: 'endDate',
              type: 'date',
              value: props.editDetails.endDate,
              placeholder: 'End Date'
            },
            {
              name: 'phoneNumber',
              type: 'text',
              value: `${props.editDetails.phoneNumber}`,
              placeholder: 'Contact number',
            },
            {
              name: 'jobCategory',
              type: 'select',
              value: props.editDetails.jobCategory,
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
              
              value: `${props.editDetails.linkedinProfile}`,
              placeholder: 'Linkedin Profile ',
            },
            {
              name: 'instagramId',
              type: 'text',
              value: `${props.editDetails.instagramId}`,
              placeholder: 'Instagram Id',
            },
            {
              name: 'profilePhoto',
              type: 'file',
              value: `${props.editDetails.profilePhoto}`,
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
              value: `${props.editDetails.profilePhoto}`,
              label: 'Profile Photo'
            },
            {
              name: 'name',
              value: `${props.editDetails.name}`,
              label: 'Name '
            },
          {
            name: 'email',
            value: `${props.editDetails.email}`,
            label : 'Email '
            },
          {
            name: 'startDate',
            value: `${props.editDetails.startDate}`,
            label: 'Start Date '
          },
          {
            name: 'endDate',
            value: `${props.editDetails.endDate}`,
            label: 'End Date '
          },
          {
            name: 'phoneNumber',
            value: `${props.editDetails.phoneNumber}`,
            label: 'Phone Number '
          },
          {
            name: 'linkedinProfile',
            value: `${props.editDetails.linkedinProfile}`,
            label: 'Linkedin Profile '
          },
          {
            name: 'instagramId',
            value: `${props.editDetails.instagramId}`,
            label: 'Instagram Profile '
          },
          {
            name:'jobCategory',
            value: `${props.editDetails.jobCategory}`,
            label: 'Job Category '
    
          },
            ]
          }
          
      ];
      
      
  return (
    <div className="container py-5 " style={{"height": "100%"}}>
            <div className="row d-flex justify-content-center align-items-center h-90">
            <div className="col col-xl-8">
                <div className="card" style={{"borderRadius": "1rem"}}>
                <div className="row g-1">
                    
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    
                    <div className="card-body p-4 p-lg-5 text-black">
                        
                            <form onSubmit={handleSubmit} >

                            <div className="d-flex align-items-center mb-3 pb-1">
                                <i className="fas fa-cubes fa-2x me-3" style={{"color": "#ff6219"}}></i>
                                <span className="h3 fw-bold mb-0 text-center">Edit Details</span>
                            </div>
                            <ul className={`${classes.progressbar} `} id={[classes.progressbar]}>
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
                                                    value={field.value}
                                                    onChange={onChange}
                                                    className="form-control form-control-lg"
                                                >
                                                    <option value=""></option>
                                                    {props.options.map((option) => (
                                                    <option key={option.name} value={option.name}>
                                                        {option.name}
                                                    </option>
                                                    ))}
                                                </select>
                                                <label htmlFor={field.name}>{field.placeholder}</label>
                                                </div>
                                            ) 
                                        : (
                                            <div className="form-outline mb-3"> 
                                            <input
                                                key={index}
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder || ""}
                                                value={field.type === 'file' ? '' : field.value}
                                                className="form-control form-control-sm"
                                                onChange = {onChange}
                                                required
                                            />
                                    
                                            <label className="form-label" htmlFor="form3Example1cg">{field.placeholder}</label>
                                            </div>
                                            )}
                                        </>
                                    )}
                                </div>
                                ))}
                            </div>
                            
                                <div className="d-flex justify-content-center ">
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

export default EditIntern