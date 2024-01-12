import React,{useState, useEffect} from 'react';
import Histogram from 'react-chart-histogram';
import { Chart } from "react-google-charts";

const Dashboard = (props) => {
    const[thisMonth, setThisMonth] = useState(0);
    const [thisWeek, setThisWeek] = useState(0);
    const [thisDay, setThisDay] = useState(0);
    const labels = props.options.map((option) => option.name);
    const data = labels.map((label) =>{
        const newArray = props.details.filter((item) => item.jobCategory === label)
        return newArray.length;
    })
    function updateThisMonth(details) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        let countThisMonth = 0;
        details.forEach(detail => {
          const month = detail.date.slice(5, 7);
          if (currentMonth - month === 0) {
            countThisMonth++;
          }
        });
        setThisMonth(countThisMonth);
      }
      function updateThisWeek(details) {
        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        const currentWeekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6);
        let countThisWeek = 0;
        details.forEach(detail => {
          const detailDate = new Date(detail.date);
          if (detailDate >= currentWeekStart && detailDate <= currentWeekEnd) {
            countThisWeek++;
          }
        });
        setThisWeek(countThisWeek);
      }
      function updateThisDay(details) {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        let countThisDay = 0;
        details.forEach(detail => {
          const detailDate = new Date(detail.date);
          const detailDay = detailDate.getDate();
          const detailMonth = detailDate.getMonth() + 1;
          const detailYear = detailDate.getFullYear();
          if (currentDay === detailDay && currentMonth === detailMonth && currentYear === detailYear) {
            countThisDay++;
          }
        });
        setThisDay(countThisDay);
      }
  const colors = ["#FFD700", "#00ff8c", "#C70039", "#900C3F", "#581845"];
  const options = { 
    
    strokeColor: "#e1ff00",
    colors: colors
  }; 
  useEffect(() => {
    updateThisMonth(props.details);
    updateThisWeek(props.details);
    updateThisDay(props.details);
  }, [props.details]);
  return (
    <div className='d-flex flex-column justify-content-around' style ={{height:"88vh"}}>
        <div className='d-flex flex-row justify-content-center mx-2' style ={{}}>
        <div className="card bg-dark text-white border ">
            <div className="card-content">
                <div className="card-body">
                <div className="media d-flex">
                    <div className="align-self-center">
                    <i className="icon-pencil primary font-large-2 float-left"></i>
                    </div>
                    <div className="media-body text-left">
                    <h3>{props.details.length}</h3>
                    <span>Total Registered Interns</span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="card bg-dark text-white border mx-4">
            <div className="card-content">
                <div className="card-body">
                <div className="media d-flex">
                    <div className="align-self-center">
                    <i className="icon-pencil primary font-large-2 float-left"></i>
                    </div>
                    <div className="media-body text-left">
                    <h3>{thisMonth}</h3>
                    <span>Interns this month</span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="card bg-dark text-white border mx-4">
            <div className="card-content">
                <div className="card-body">
                <div className="media d-flex">
                    <div className="align-self-center">
                    <i className="icon-pencil primary font-large-2 float-left"></i>
                    </div>
                    <div className="media-body text-left">
                    <h3>{thisWeek}</h3>
                    <span>Interns this week</span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="card bg-dark text-white border mx-4">
            <div className="card-content">
                <div className="card-body">
                <div className="media d-flex">
                    <div className="align-self-center">
                    <i className="icon-pencil primary font-large-2 float-left"></i>
                    </div>
                    <div className="media-body text-left">
                    <h3>{thisDay}</h3>
                    <span>Interns today</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className='d-flex justify-content-center mt-4'>
        <Histogram
            xLabels={labels}
            yValues={data}
            width='1100'
            height='400'
            options={options}
        />
        </div>
    </div>
  )
}

export default Dashboard