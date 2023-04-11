import React, {useEffect, useState, useRef} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './WorkerProfile.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { tab } from '@testing-library/user-event/dist/tab';

const InaData = ({inaData, setInaData}) => {
  const tableRef = useRef(null);

  const {onDownload} = useDownloadExcel({
    currentTableRef :tableRef.current,
    filename : 'ina worker profile',
    sheet : 'ina'
  })


const getInaData = () => {
    const url = 'http://192.168.15.8:5239/api/InaWorkerProfile'
    axios.get(url).then(res => {
      setInaData(res.data)
    }).catch(error => {
      console.log(error)
    })
  }

    useEffect(() => {
        getInaData();
      }, [])
  return (
    <Container>
        <Row>
            
            <Col className='tableContainer'>
          <Table striped bordered hover size='sm' ref={tableRef}>
            <thead>
              <tr>
                <th>Index</th>
                <th>Enroll ID</th>
                <th>Employee No</th>                
                {/* <th>RFID</th> */}
              </tr>
            </thead>
            <tbody>
              {
                inaData ? inaData.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.eM_Key}</td>                    
                    <td>{item.eM_ID.trim()}</td>                    
                    
                  </tr>
                )) : "Loading..."
              }
            </tbody>
          </Table>
        </Col>
            
        </Row>
        <Row className='m-3'>
          <Col>
          <Button onClick={onDownload}>Export to Excel</Button>
          </Col>
        </Row>


    </Container>
  )
}

export default InaData