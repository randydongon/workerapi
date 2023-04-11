import React, { useState, useEffect, useRef } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './WorkerProfile.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDownloadExcel } from 'react-export-table-to-excel';

const WebmisData = ({webmis, setWebmis}) => {
    
    const tableRef = useRef(null);

    const {onDownload} = useDownloadExcel({
        currentTableRef : tableRef.current,
        filename : 'Webmis worker profile',
        sheet : 'webmis'
    })

    const getData = () => {
        const url = "http://192.168.15.8:5239/api/V_HANGER_LINE_WORKER";
        axios.get(url).then(res => {
            setWebmis(res.data);
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getData();
    }, [])



    return (
        <Container>
            <Row>
                <Col className='tableContainer'>

                    <Table striped bordered hover ref={tableRef}>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Enroll Number</th>
                                <th>Employee No</th>
                                {/* <th>Id Card Number</th> */}
                                {/* <th>Type Code</th> */}
                            </tr>
                        </thead>
                        <tbody >
                            {webmis ? webmis.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {item.enrolL_NO}
                                    </td>
                                    <td>{item.employeE_NO}</td>
                                    {/* <td>{item.idcarD_NO}</td> */}
                                    {/* <td>{item.typE_CODE}</td> */}

                                </tr>
                            ) : "Loaing..."}
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

export default WebmisData