import React from 'react'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import './WorkerProfile.css'

const Uploaded = ({ uploaded }) => {

    return (
        <Container >
            <Row>

                <Col className='tableContainer'>
                    <Table striped bordered hover size='sm'>
                        <thead>
                            <tr>
                                <th>Enroll No</th>
                                <th>Employee No</th>
                                <th>Employee Name</th>

                            </tr>
                        </thead>
                        <tbody>
                            {uploaded ? uploaded.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.eM_Key}</td>
                                    <td>{item.eM_ID}</td>
                                    <td>{item.eM_LastName}</td>
                                </tr>
                            )) : 'Loading...'}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Uploaded