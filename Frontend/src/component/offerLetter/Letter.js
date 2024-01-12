import React, { useRef } from "react";
import Top from '../../Assets/top.png'
import Bottom from '../../Assets/bottom.png'
import classes from './Letter.module.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const Letter = (props) => {
    const contentRef = useRef(null);
    const ref = useRef(null);
    const handleDownload = () =>{
      generatePDF(ref);
    }
    const generatePDF = (componentRef) => {
      html2canvas(componentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        setTimeout(() => {
          pdf.save('Offer_letter.pdf');
        }, 1000); 
      });
    };
    
  return (
    <div ref={contentRef}>
    <div  className={classes.letterWrapper} ref={ref}>
        <div className='mb-4'> 
            <img className={classes.imageClass} src={Top} alt="top"   />
         </div>
        <div className={classes.content}> 
        Dear {props.details.name},<br/>

            I am pleased to offer you an internship opportunity at the Beal Foundation in the fundraising domain. We are confident that your skills and experience will make a valuable contribution to our organization.<br/>

            The internship will be for a duration of one month, starting from {props.details.startDate} to {props.details.endDate}. During this period, you will have the opportunity to work with our fundraising team and gain valuable experience in the field.<br/>

            As part of the internship, we are pleased to offer a stipend of 15% of the total funds raised during your tenure with us. This will be paid out at the end of the internship period.<br/>

            Please find below the terms and conditions of the internship:<br/>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item">Responsibilities: As an intern, you will be responsible for supporting the fundraising team with various tasks, such as donor research, creating fundraising campaigns, and assisting with fundraising events.
                </li>
                <li className="list-group-item">Working hours: The internship will require a commitment of [number of hours] per week, with the exact schedule to be determined in consultation with the fundraising team.
                </li>
                <li className="list-group-item">Confidentiality: You will be required to sign a confidentiality agreement and to maintain the confidentiality of all information related to the Beal Foundation and its donors.
                </li>
                <li className="list-group-item">Intellectual Property: Any intellectual property developed during the course of your internship will belong to the Beal Foundation.

                </li>
                <li className="list-group-item">Evaluation: We will conduct periodic evaluations to assess your performance during the internship and provide feedback to help you grow in your role.

                </li>
                <li className="list-group-item">Termination: Either party may terminate the internship at any time with two weeks’ notice.
                </li>
            </ol>
            Please sign and return a copy of this letter to indicate your acceptance of this internship offer. We look forward to welcoming you to the Beal Foundation team and wish you all the best in your future endeavors.

            Sincerely,
        </div>
        <div className='mt-2'>
        <img className={classes.imageClass} src={Bottom} alt="top"   />
        </div>
        <div className={classes.dbuttonWrapper}>
      <button className={`btn btn-primary my-3 mx-2`} onClick={handleDownload}>Download pdf</button>
      </div>
    </div>
    </div>
    
  )
}

export default Letter;