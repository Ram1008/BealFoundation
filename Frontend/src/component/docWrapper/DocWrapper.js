import React, { useRef, useEffect } from 'react';
import ThankYou from '../../Assets/ThankYou.png';
import classes from './DocWrapper.module.css';
import { useNavigate } from 'react-router-dom';
import Letter from '../offerLetter/Letter';
import jsPDF from 'jspdf';
import Terms from '../termsAndCondition/Terms';
import html2canvas from 'html2canvas';

const DocWrapper = (props) => {
  const component1Ref = useRef(null);
  const component2Ref = useRef(null);
  const navigate = useNavigate();
 const handleOffer = () =>{
  navigate("/offerLetter");
 }
 const handleTerms = () =>{
  navigate("/terms");
 }
  const generatePDF = (componentRef) => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      // mail this pdf
    });
  };

  // useEffect(() => {
  //   generatePDF(component1Ref);
  //   generatePDF(component2Ref);
  // }, []);

  return (
    <div className={`${classes.cardWrapper} card`} style={{ width: '30rem' }}>
      <img className="card-img-top" src={ThankYou} alt="" />
      <div className="card-body">
        <p className="card-text">
          <strong>Please go through mail for Terms and Offer Letter</strong>
        </p>
        <div className={classes.dbuttonWrapper}>
          <div>
            <strong>Your Intern Id is: BEAL/2020/{props.details.internID} </strong>{' '}
          </div>
          
        </div>
        <div className='d-flex flex-row justify-content-around mt-2'>
          <button className='btn btn-primary mx-2' onClick={handleOffer}>Offer Letter</button>
          <button className='btn btn-primary mx-2' onClick={handleTerms}>Terms and Conditions</button>
        </div>
         <div style = {{display: "none"}}><div ref={component1Ref}>
          <Letter details={props.details} />
        </div>
        <div ref={component2Ref}>
          <Terms />
        </div></div>
      </div>
    </div>
  );
};

export default DocWrapper;
