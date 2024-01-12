import React from 'react'

const AdminTable = (props) => {
  return (
    <table className='table align-middle text-white shadow p-2 mb-2 mt-5 bg-dark rounded'  
     style={{ tableLayout: "fixed", border:"2px solid #f5f5f5", borderCollapse:"separate",  borderSpacing: "3px"}}>
    <thead>
      <tr>
        
        <th scope="col" className="border">Name</th>
        <th scope="col" className="border">Email</th>
        <th scope="col" className="border">Access</th>
        <th scope="col" className="border">Action</th>
      
      </tr>
    </thead>
    <tbody>
    {props.details.map((detail) => (
        <tr className='mt-2' key={detail.email}>
          <td className="border"><strong>{detail.name}</strong></td>
          <td className="border">{detail.email}</td>
          <td className="border">Admin</td>
          <td className="border"
          ><button className='btn btn-outline-danger btn-sm' onClick={() => { props.deleteUser(detail._id) }}  >Delete</button></td>
          
          
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default AdminTable