import React, { useRef } from 'react'
import Table from 'react-bootstrap/Table'
import './WorkerProfile.css'
import moment from 'moment/moment'
import { Button } from 'react-bootstrap'
import { useDownloadExcel } from 'react-export-table-to-excel'

const DataOutput = ({ data }) => {

    const tableRef = useRef(null)
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Worker Output',
        sheet: 'result'
    })
    return (
        <div>

            <div className='tableContainer my-3'>
                <Table striped bordered hover size='sm' ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>ID</th>
                            <th>Employee No</th>
                            <th>Production Date</th>
                            <th>PN No</th>
                            <th>PN Subno</th>
                            <th>Qty</th>
                            <th>Size Code</th>
                            <th>WP Code</th>
                            <th>WP Name</th>
                            <th>Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nontkT_LINE_ID}</td>
                                    <td>{item.employeE_NO}</td>
                                    <td>{moment(item.nontkT_DATE).format("yyyy-MM-DD")}</td>
                                    <td>{item.pN_NO}</td>
                                    <td>{item.pN_SUBNO}</td>
                                    <td>{item.nontkT_QTY}</td>
                                    <td>{item.sizE_CODE}</td>
                                    <td>{item.wP_CODE}</td>
                                    <td>{item.wP_NAME}</td>
                                    <td>{item.wP_PRICE}</td>
                                </tr>
                            )
                        }

                    </tbody>

                </Table>

            </div>
            <Button className='my-3' onClick={onDownload}>Export  to excel</Button>
        </div>
    )
}

export default DataOutput