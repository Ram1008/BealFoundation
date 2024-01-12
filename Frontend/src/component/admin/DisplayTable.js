import React from 'react'
const DisplayTable = (props) => {
  return (
    
    
    <table className='table align-middle text-white shadow p-2 mb-5 bg-dark rounded' 
    style={{width:"95%", margin: "auto", tableLayout: "fixed", border:"3px solid #f5f5f5", borderCollapse:"separate",  borderSpacing: "3px"}}>
    <thead className='rounded' style = {{}}>
      <tr>
        <th scope="col" className="border" style={{"width": "9%", overflow:'wrap'}}>Intern ID</th>
        <th scope="col" className="border" style={{"width": "10%", overflow:'wrap'}}>Name</th>
        <th scope="col" className="border" style={{"width": "10%", overflow:'wrap'}}>Email</th>
        <th scope="col" className="border" style={{"width": "7%", overflow:'wrap'}}>Start Date</th>
        <th scope="col" className="border" style={{"width": "7%", overflow:'wrap'}}>End Date</th> 
        <th scope="col" className="border" style={{"width": "9%", overflow:'wrap'}}>Phone Number</th>
        <th scope="col" className="border" style={{"width": "9%", overflow:'wrap'}}>Linkedin Profile</th>
        <th scope="col" className="border" style={{"width": "9%", overflow:'wrap'}}>Instagram Id</th>
        <th scope="col" className="border" style={{"width": "8%", overflow:'wrap'}}>Profile Photo</th>
        <th scope="col" className="border" style={{"width": "9%", overflow:'wrap'}}>Action</th>
      </tr>
    </thead>
    <tbody>
      {props.details.map((detail) => (
        <tr className='mb-2' key={detail.email}>
          <td className="border" style={{"width": "9%", "wordWrap": "break-word"}}><strong>BEAL/2020/{detail.internID}</strong></td>
          <td className="border" style={{"width": "10%", "wordWrap": "break-word"}}>{detail.name}</td>
          <td className="border" style={{"width": "10%", "wordWrap": "break-word"}}>{detail.email}</td>
          <td className="border" style={{"width": "7%", "wordWrap": "break-word"}}>{detail.startDate.slice(0,10)}</td>
          <td className="border" style={{"width": "7%", "wordWrap": "break-word"}}>{detail.endDate.slice(0,10)}</td>
          <td className="border" style={{"width": "9%", "wordWrap": "break-word"}}>{detail.phoneNumber}</td>
          <td className="border" style={{"width": "9%", "wordWrap": "break-word"}}>{detail.linkedinProfile}</td>
          <td className="border" style={{"width": "9%", "wordWrap": "break-word"}}>{detail.instagramId}</td>
          <td className="border" style={{"width": "8%", "wordWrap": "break-word"}}><button onClick = {() => { window.open(detail.profilePhoto, '_blank'); } }className='btn btn-outline-info btn-sm'>View photo</button></td>
          <td className="border" style={{"width": "9%", "wordWrap": "break-word"}}>
            <button className='btn btn-outline-danger btn-sm' onClick={() => { props.deleteIntern(detail._id) }} >Delete</button>
            <button className='btn btn-outline-info btn-sm m-2' onClick={() => {props.editClick(detail._id)}} >Edit</button>
            </td>
          
        </tr>
      ))}
    </tbody>
  </table>



);
}

export default DisplayTable;