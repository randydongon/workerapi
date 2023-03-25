import React, {useState, useEffect, Fragment} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import './WorkerProfile.css'

const WorkerProfile = () => {
  const[data, setData] = useState([])

  const getData = ()=>{
    const url = "http://localhost:27273/api/V_Haanger_Line_Worker";
    axios.get(url).then(res=>{
      setData(res.data);
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getData();
  },[])


  return (
    <div className='tableContainer'>
      
        <Table striped bordered hover >          
      <thead>
        <tr>
          <th>Enroll Number</th>
          <th>Employee No</th>
          <th>Employee Name</th>
          <th>Gender</th>
          <th>Department Code</th>
          <th>Section Code</th>
          <th>Id Card Number</th>
          <th>Type Code</th>
          <th>Title Code</th>
        </tr>
      </thead>
      <tbody >
        {data ? data.map((item,index)=>
          <tr key={index}>
            <td>
              {item.enrolL_NO}
            </td>
            <td>{item.employeE_NO}</td>
            <td>{item.employeE_NAME}</td>
            <td>{item.employeE_SEX}</td>
            <td>{item.departmenT_CODE}</td>
            <td>{item.sectioN_CODE}</td>
            <td>{item.idcarD_NO}</td>
            <td>{item.typE_CODE}</td>
            <td>{item.titlE_CODE}</td>
          </tr>
        ): "Loaing..."}  
      </tbody>
    </Table>
    
    </div>
  )
}

export default WorkerProfile


// style={{width:'100%', height:'20em',overflow:'scroll'}}