import React, { useState, useEffect } from 'react'
import HangerLineData from './HangerLineData'
import axios from 'axios'
import moment from 'moment'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import LineDropdown from './LineDropdown'
import EditData from './EditData'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Form from 'react-bootstrap/Form';

const HangerLineOutput = () => {
  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState("")
  const [total, setTotal] = useState(0)
  const [selectLine, setSelectLine] = useState({})
  const [upload, setUpload] = useState(true) //enable/deable upload button
  const [result, setResult] = useState(null);
  const [editItem, setEditItem] = useState({})
  const [show, setShow] = useState(false)
  const [lined, setLined] = useState(false) //enable/desable select lines
  const [dated, setDated] = useState(false) //enable/desable select date
  const [searchb, setSearchb] = useState(false) //enable/desable search button

  const [line, setLine] = useState([
    {
      value: 101,
      label: "Line 1",
      url: ''
    },
    {
      value: 102,
      label: "Line 2",
      url: ""
    },
    {
      value: 103,
      label: "Line 3",
      url: ""
    },
    {
      value: 104,
      label: "Line 4",
      url: `http://192.168.15.8:5239/api/HangerFour/${startDate}`
    }
  ])

  const handleSearchDate = (e) => {
    e.preventDefault();
    setUpload(false)
    setData([])
    const date = moment(startDate).format("yyyy-MM-DD")
    if (date === "Invalid date") {
      alert(date + "! Try select date")
      return;
    }
    var url = ""
    switch (selectLine.value) {
      case 101:
        url = `http://192.168.15.8:5239/api/LineOne/${date}`
        break;
      case 102:
        url = `http://192.168.15.8:5239/api/LineTwo/${date}`
        break;
      case 103:
        url = `http://192.168.15.8:5239/api/LineThree/${date}`
        break;
      case 104:
        url = `http://192.168.15.8:5239/api/LineFour/${date}` //http://localhost:4316/api/LineFour
        break;
      default:
        alert("SELECT LINE")
        return;
    }
    const today = new Date().toISOString().slice(0, 10)

    //check if today's date is equal to on going production date
    if (today === date) {
      alert("Production is on going for today : " + today + "\nToday's production can only be imported to WEBMIS tomorrow!");
      return;
    }

    axios.get(`http://192.168.15.8:5239/uploaded/${selectLine.value}/${date}`)
      .then(res => {
        setResult(res.data)

      }).catch(error => {
        alert(error)
      })

    // const url = `http://localhost:4316/api/HangerFour/${date}`
    axios.get(url).then(res => {
      if (res.data.length <= 0) {
        alert("No data found!")
        return;
      }

      const tempData = res.data.map(item => ({
        EMPLOYEE_NO: String(item.odpI_EM_LCD_Name).trim(),
        NONTKT_DATE: moment(item.odpI_Date).format("yyyy-MM-DD"),
        PN_NO: item.odpI_Lot_Number.split("-")[0],
        PN_SUBNO: String(item.odpI_Lot_Number.split("-")[1]),
        SIZE_CODE: item.odpI_SM_Description,
        WP_CODE: item.odpI_OC_Description.split("-")[0],
        WP_NAME: item.odpI_OC_Description.split("-")[1],
        NONTKT_QTY: item.odpI_Quantity,
        WP_PRICE: item.odpI_Piece_Rate,
        WP_ALLOWANCE: 0.0000
      }))
      setData(tempData)
    }).catch(error => {
      console.log(error)
    })
  }

  // upload worker output from hanger line
  const handleUploadToWebmis = (e) => {
    e.preventDefault();

    setUpload(true)

    if (data.length <= 0) {
      alert("No data to upload!!!")
      return;
    }
    const dd = result.length > 0 ? moment(new Date(result[0].productioN_DATE)).format("yyyy-MM-DD") : ""
    const ll = result.length > 0 ? result[0].hanger_Line : 0

    if (String(dd) === String(moment(startDate).format("yyyy-MM-DD")) && Number(ll) === Number(selectLine.value)) {
      alert("These data has been uploaded to WEBMIS!!!");
      setData([])
      return;
    }

    if (window.confirm("Are you sure to upload worker output to webmis?\nclick Ok to proceed!!!\nclick Cancel to cancel upload!")) {
      uploadToWebmis();
      setLined(true)
      setDated(true)
      setSearchb(true)

    } else {
      toast.warn("Cancel upload!!!")
    }
  }

  const uploadToWebmis = () => {

    const url = 'http://192.168.15.8:5239/hangerline';
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    var i = 0;
    var ttal = 0;

    data.forEach(function (item) {
      setTimeout(function () {
        axios.post(url, item, options)
          .then(res => {
            // console.log("RESPONSE === ", res)

            ttal = ttal += item.NONTKT_QTY;

          })
          .catch(error => {
            console.log("ERROR: ", error)
            toast.error(error)

          })
          .finally(() => {

            const index = data.indexOf(item);
            data.splice(index, 1)
            setData([...data])

            if (data.length <= 0) {
              toast.success(selectLine.label + " output uloaded to WEBMIS")
              console.log("upload output")
              setLined(false)
              setDated(false)
              setSearchb(false)

              handleReminder(ttal);
            }
          })
      }, 100 * i++)

    })


  }

  //insert production date, total qty, line number. this counter check if hanger line number  is already uploaded to webmis 
  const handleReminder = (ttal) => {

    const url = 'http://192.168.15.8:5239/uploaded'
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const newdata = {
      productioN_DATE: moment(startDate).format("yyyy-MM-DD"),
      uploaded: 'y',
      qty: ttal,
      hanger_Line: selectLine.value
    }
    console.log("upload data: ", newdata)
    axios.post(url, newdata, options)
      .then(res => {
        console.log("Response: ", res)
      })
      .catch(error => {
        console.log("Error: ", error)
      })

  }  ///my works ends here continue tomorrow

  const handleEditItem = (item, index) => {
    setShow(true)
    setEditItem(item, index)
  }
  const handleSaveEditItem = (pn, subpn) => {
    console.log(pn, subpn)
    const newdd = data.map(item => {

      if (item.PN_SUBNO === editItem.PN_SUBNO) {
        return { ...item, PN_SUBNO: subpn }
      }

      return { ...item }

    });

    setData(newdd)
    setShow(false)
  }

  //   <DatePicker disabled={dated}
  //   showIcon
  //   selected={startDate}
  //   onChange={(date) => setStartDate(date)}
  // />

  // <Col xs={3} className='d-flex'>Select Line<LineDropdown line={line} selectLine={selectLine} setSelectLine={setSelectLine} setUpload={setUpload} lined={lined} /></Col>


  return (
    <>
      <Row className='my-3'>
        <Form style={{maxWidth:"200px"}}>
          <Form.Group className='mb-3' >
            <Form.Label>Search date: </Form.Label>
            <Form.Control type="date" placeholder='Select date' onChange={(e) => setStartDate
              (e.target.value)} value={startDate} />
            <Form.Text >

            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3' >    
            <Form.Text  >
              <LineDropdown line={line} selectLine={selectLine} setSelectLine={setSelectLine} setUpload={setUpload} lined={lined} />
            </Form.Text>
          </Form.Group>
          <Form.Group>
          <Button disabled={searchb} size='md' onClick={handleSearchDate} >Search</Button>
          </Form.Group>
        </Form>        
      </Row>
      <Row>
        <Col><HangerLineData data={data} handleEditItem={handleEditItem} /></Col>

      </Row>
      <Row>
        <Col className='my-3'><Button disabled={upload} onClick={handleUploadToWebmis}>Upload</Button></Col>
      </Row>
      {show && <EditData show={show} setShow={setShow} data={editItem} handleSaveEditItem={handleSaveEditItem} />}
      <ToastContainer />


    </>
  )
}

export default HangerLineOutput