import React, { useRef, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import './WorkerProfile.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDownloadExcel } from 'react-export-table-to-excel';

// http://192.168.15.8:5239/workeroutput/

const ViewWokersOutput = () => {
    const[data, setDate] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    const tableRef = useRef(null)
  
    const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: 'result worker profile',
      sheet: 'result'
    })
  return (
    <>
    <Row>
      <Col className='tableContainer'>
        {/* result table */}
        <Table striped bordered hover size='sm' ref={tableRef}>
          <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>Employee No</th>              
              <th>Employee Name</th>
              <th>RFID</th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>

        </Table>
      </Col>
    </Row>
    
  </>
  )
}

export default ViewWokersOutput