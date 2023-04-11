import React, { useRef, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import './WorkerProfile.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDownloadExcel } from 'react-export-table-to-excel';
import Form from 'react-bootstrap/Form'
import './WorkerProfile.css'
import DataOutput from './DataOutput';
import axios from 'axios';
import { toast } from 'react-toastify';

// http://192.168.15.8:5239/workeroutput/

const ViewWokersOutput = () => {
    const[data, setData] = useState([])
    const[isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const tableRef = useRef(null)
  
    const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: 'result worker profile',
      sheet: 'result'
    })

   const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(startDate, endDate)
    const url = `http://192.168.15.8:5239/workeroutput/${startDate}/${endDate}`
    axios.get(url)
    .then(res=>{
      setData(res.data)
    })
    .catch(error=>{
      toast.error(error)
    })
   }

  return (
    <>
    <Row>
      <Col>
      <Form>
      <Form.Group>
      <Form.Label>Start date: </Form.Label>
      <Form.Control type='date' placeholder='Select date' onChange={(e)=>setStartDate(e.target.value)} value={startDate} />
      <Form.Label>End Date: </Form.Label>
      <Form.Control type='date' placeholder='Select date' onChange={(e)=>setEndDate(e.target.value)} value={endDate} />   
      <Button size='sm' className='my-3' onClick={handleSubmit}>Search</Button>  
      </Form.Group>
      
      </Form>
        <DataOutput data={data} />
        
      </Col>
      
    </Row>
    
  </>
  )
}

export default ViewWokersOutput