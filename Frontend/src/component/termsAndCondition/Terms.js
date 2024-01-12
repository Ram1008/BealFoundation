import React, { useRef } from "react";
import Top from '../../Assets/top.png'
import Bottom from '../../Assets/bottom.png'
import classes from './Terms.module.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const Terms = () => {
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
          pdf.save('Terms.pdf');
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
            <ol className="list-group list-group-numbered">
                <li className="list-group-item">Duration of Internship: The duration of the internship will be agreed upon by
the intern and Beal Foundation at the beginning of the internship.
                </li>
                <li className="list-group-item">Job Description: The intern will be responsible for completing the tasks
assigned to them by Beal Foundation. The intern will receive training and
guidance as needed to complete their tasks.
                </li>
                <li className="list-group-item">Data Privacy: The intern agrees to maintain the confidentiality and privacy of
all information received or accessed during the internship. In the event of a
data breach, the intern will inform Beal Foundation immediately.
                </li>
                <li className="list-group-item">Salary: The intern will not receive any salary or compensation from Beal
Foundation for their work during the internship

                </li>
                <li className="list-group-item">Attendance: The intern is expected to complete the tasks assigned to them
by Beal Foundation within the agreed upon timeline. In the event that the
intern is unable to complete their tasks due to unforeseen circumstances,
they should inform Beal Foundation as soon as possible.

                </li>
                <li className="list-group-item">Termination: Beal Foundation reserves the right to terminate the internship at
any time, with or without cause. The intern may also terminate the internship
with Beal Foundation at any time, with or without cause.
                </li>
                <li className="list-group-item">Intellectual Property: Any intellectual property created during the course of
the internship will be the property of Beal Foundation.
                </li>
                <li className="list-group-item">Code of Conduct: The intern will adhere to the code of conduct outlined by
Beal Foundation, which includes maintaining a professional attitude, avoiding
conflicts of interest, and avoiding discrimination and harassment.
                </li>
                <li className="list-group-item">Governing Law: These terms and conditions shall be governed by and
construed in accordance with the laws of the jurisdiction in which Beal
Foundation is incorporated.

                </li>
            </ol>
            By accepting these terms and conditions, the intern agrees to comply with all the
terms and conditions set forth herein.
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

export default Terms;