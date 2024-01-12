import React from 'react'

const DomainTable = (props) => {
  return (
    <table className='table align-middle text-white shadow p-2 mb-2 mt-5 bg-dark rounded'  
     style={{width:"95%", margin: "auto", tableLayout: "fixed", border:"2px solid #f5f5f5", borderCollapse:"separate",  borderSpacing: "3px"}}>
                    <thead>
                    <tr>
                        
                        <th scope="col" className="border">Domains</th>
                        <th scope="col" className="border">Action</th>
                    
                    </tr>
                    </thead>
                    <tbody>
                    {props.options.map((option) => (
                        <tr className='mt-2' key={option.name}>
                        <td className="border">{option.name}</td>
                        <td className="border"><button className='btn btn-outline-danger btn-sm' onClick={() =>{props.deleteOption(option._id)}}  >Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
  )
}

export default DomainTable