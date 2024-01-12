import React, { useRef, useEffect } from "react";
import {toPng} from "html-to-image";
import classes from './Certificate.module.css';
import { saveAs } from 'file-saver';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CertificateImage from '../Assets/Certificate.png';
const Certificate = (props) => {
  const date1 = new Date(props.details.startDate);
            const date2 = new Date(props.details.endDate);
            var time_difference = date2.getTime() - date1.getTime();   
            var days_difference = time_difference / (1000 * 60 * 60 * 24); 
  const ref = useRef(null);
  const saveImage = async () => {
    
    try {
      const node = ref.current;
      const dataUrl = await toPng(node);
      const blob = await fetch(dataUrl).then(res => res.blob());
      saveAs(blob, 'certificate.png');
    } catch (err) {
      console.error('Error saving image:', err);
    }
  };
  const date = new Date();
  const time = date.getFullYear()+ "-"+ ("0" + date.getMonth()).slice(-2) + "-"+("0" + date.getDate()).slice(-2);
  useEffect(() => {
    toast.success('Congratulations for Internship Completion!');
    
  },[]);
  return (
    <div className="d-flex flex-column">
      <div className={classes.imageWrapper} ref={ref}>
        <div className={classes.nameText}>{props.details.name}</div>
        <div className={classes.internId}>{props.details.internID}</div>
        <div className={classes.days}>{days_difference}</div>
        <div className={classes.dateText}>{time}</div>
        <img className={classes.image} src={CertificateImage} alt="certificate" />
      
      </div>
      <div className={classes.dbuttonWrapper}>
      <button className={`btn btn-primary my-3 mx-2`} onClick={saveImage}>Download Image</button>
      </div>
      <ToastContainer/>
     </div>
  );
};

export default Certificate;
