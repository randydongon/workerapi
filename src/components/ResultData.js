import React, { useRef, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import './WorkerProfile.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDownloadExcel } from 'react-export-table-to-excel';

const ResultData = ({ resData, datasync, isLoading }) => {
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
                <th>Enroll No</th>
                <th>Employee No</th>
                <th>Employee Name</th>
                <th>RFID</th>
              </tr>
            </thead>
            <tbody>
              {
                resData ? resData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.enrolL_NO}</td>
                    <td>{item.employeE_NO}</td>
                    <td>{item.employeE_NAME}</td>
                    <td>{item.idcarD_NO}</td>
                  </tr>
                )) : "Loading..."
              }
            </tbody>

          </Table>
        </Col>
      </Row>
      { resData.length <= 0 ? <h3></h3> :
      <Row className='my-3'>
        <Col>
          <Button onClick={datasync} disabled={isLoading}  >Upload profile</Button>
        </Col>
        <Col>
          <Button onClick={onDownload} disabled={isLoading} >Export to Excel</Button>
        </Col>
      </Row>
}
    </>
  )
}

export default ResultData