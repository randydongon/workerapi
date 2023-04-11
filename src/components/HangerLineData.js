import React from 'react'
import Table from 'react-bootstrap/Table'
import './WorkerProfile.css'
import { Button } from 'react-bootstrap'

const HangerLineData = ({ data, handleEditItem }) => {
    return (
        <div className='tableContainer'>
            <Table striped hover  >
                <thead>
                    <tr>
                        <td>Index</td>
                        <th>EMPLOYEE_NO</th>                        
                        <th>NONTKT_DATE</th>                        
                        <th>PN_NO</th>
                        <th>PN_SUBNO</th>
                        <th>SIZE_CODE</th>                        
                        <th>WP_CODE</th>
                        <th>WP_NAME</th>
                        <th>NONTKT_QTY</th>
                        <th>WP_PRICE</th> 
                        <th>WP_ALLOWANCE</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data ? data.map((item, index) =>
                    (<tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.EMPLOYEE_NO}</td>                        
                        <td>{item.NONTKT_DATE}</td>                        
                        <td>{item.PN_NO}</td>
                        <td>{item.PN_SUBNO}</td>
                        <td>{item.SIZE_CODE}</td>                        
                        <td>{item.WP_CODE}</td>
                        <td>{item.WP_NAME}</td>
                        <td>{item.NONTKT_QTY}</td>
                        <td>{item.WP_PRICE}</td>  
                        <td>{item.WP_ALLOWANCE}</td>                          
                        <td><Button size='sm' onClick={()=>handleEditItem(item,index)}>Edit Pnsub No</Button></td>
                    </tr>)
                    ) : "Loading..."}
                </tbody>

            </Table>
        </div>
    )
}

export default HangerLineData;

/*

<th>Index</th>
                    <th>Employee no</th>
                    <th>Employee name</th>                    
                    <th>Nontkt date</th>
                    <th>Nontkt type</th>
                    <th>PN no</th>
                    <th>PN subno</th>
                    <th>Size code</th>
                    <th>Size name</th>
                    <th>Color code</th>
                    <th>Color name</th>
                    <th>WP code</th>
                    <th>WP name</th>
                    <th>Nontkt qty</th>
                    <th>WP price</th>
                    <th>WP allowance</th>
                    <th>Knitter gtype</th>
                    <th>Knitter allowance</th>
                    <th>Nontkt amount</th>
                    <th>Post status</th>
                    <th>Lock flag</th>
                    <th>Create time</th>
                    <th>Create user</th>
                    <th>Update time</th>
                    <th>Update user</th>
                    <th>PN no std</th>
                    <th>PN subno std</th>

*/