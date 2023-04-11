import React, { useState, useEffect, Fragment } from 'react'
import axios, { isCancel } from 'axios';
import './WorkerProfile.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResultData from './ResultData';
import Uploaded from './Uploaded';
import LoadingSpinner from './LoadingSpinner';
import UploadSuccessful from './UploadSuccessful';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const WorkerProfile = () => {
  const [webmis, setWebmis] = useState([])
  const [inaData, setInaData] = useState([])
  const [resData, setResData] = useState([])
  const [uploaded, setUploaded] = useState([])  
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [searchId, setSearchId] = useState("")

  

  //extracting worker profile from WEBMIS DB
  const getData = () => {
    const url = "http://192.168.15.8:5239/workerprofile";
    axios.get(url).then(res => {
        setWebmis(res.data);
        
    }).catch(err => {
        console.log(err)
    })
}


//extracting worker profile from INA DB
const getInaData = () => {
  const url = 'http://192.168.15.8:5239/api/InaWorkerProfile' //http://localhost:4316/api/InaWorkerProfile
  axios.get(url).then(res => {
    setInaData(res.data)
    
  }).catch(error => {
    toast.error(error)
    
  })
}

useEffect(() => {
  getData();
  getInaData();
}, [])
 
  useEffect(() => {
    if(webmis.length <= 0 ){      
      return;
    }
    const tempData = webmis.filter(element => {
      return !inaData.some(item => String(item.eM_ID).trim() === String(element.employeE_NO).trim())

    });
    
    setResData(tempData)

  }, [webmis, inaData, setWebmis])

  //upload worker profile to ina database
  const updateProfile = async(e) => {
    e.preventDefault();
    
    const url = 'http://192.168.15.8:5239/api/InaWorkerProfile'
    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    var i = 0;
    resData.forEach(async function (item) {
      setTimeout(async function () {
        var idcard = ""
        if(item.idcarD_NO === null || item.idcarD_NO === "")
        {
            idcard = item.idcarD_NO           
        } 
        else 
        {
          //remove first 0 if idcard_no length greater than 10 characters
          idcard = String(item.idcarD_NO);
          idcard = idcard.length > 10 ? idcard.substring(1) : idcard          
        }              
        
        const data = {
          eM_Key: item.enrolL_NO,
          eM_FirstName: item.employeE_NO,
          eM_LastName: " - " + item.employeE_NAME,
          eM_LCD_Name: item.employeE_NO,
          eM_ID: item.employeE_NO,
          eM_RFID: idcard          
        }

        const emID = await checkDuplicate(String(item.employeE_NO).trim())     
        
        //check for duplicate 
        if (String(item.enrolL_NO).trim() === String(emID).trim()) {
          console.log("duplicate : " + emID)
          return
        } 
        

       axios.post(url, data, options)
          .then((res) => {
            // console.log("RESPONSE ==== : ", res);            

          })
          .catch((err) => {
            toast.error(err)
            console.log("ERROR: ====", err);
          }).finally(()=>{
            const dd = resData.indexOf(item)           
            const aa = resData.splice(dd,1)
            setResData([...resData])

            //update uploaded state
            setUploaded(prevState => {
              const newState = [...prevState, data]; // update state as you did before.       
    
              return newState;
          });
            
            if(resData.length <= 0){

              setIsLoading(false)
              // setShowModal(true)
              toast.success("Profile uploaded successfully!!!")


            }
            
            
          })

        
      }, 50 * ++i)
    })
    
    //disable upload button
    if (resData.length <= 0) {
      setIsLoading(false)
    }
    else {
      setIsLoading(true)
    }
    
  }

  //search for duplicate in INA DB
  const checkDuplicate = async (id) => {
    var val = 0;
    const url = `http://192.168.15.8:5239/api/InaWorkerProfile/${id}` //http://localhost:4316/api/InaWorkerProfile/DUB02058
    await axios.get(url).then(res=>{
      val = res.data.eM_ID
      
    }).catch(error=>{
      // console.log(error)
      toast.error(error)
    })
      return val
  }

  //search employee no from webmis
  const handleSearch = (e)=>{
    e.preventDefault();
    if(searchId === ''){
      alert("Input Employee No")
      return;
    }
    const url = `http://192.168.15.8:5239/api/V_HANGER_LINE_WORKER/${searchId}`
    axios.get(url).then((res)=>{      
      setWebmis([res.data])
    })
    .catch(error=>{
      toast.error(error)
    })
    
    setSearchId("")


  }

  return (
    <div>      
      <Row >
        <UploadSuccessful showModal={showModal} setShowModal={setShowModal} />
        <Col>        
          <h4 className='text-center'>Upload profile to INA system</h4>
          <span>Search by Employee No: </span> 
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search Employee no"
          aria-label="Search Employee no"
          aria-describedby="basic-addon2"
          value={searchId}
          onChange={(e)=>setSearchId(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={handleSearch} >
          Search
        </Button>
      </InputGroup>
          <ResultData resData={resData} datasync={updateProfile} isLoading={isLoading} />       
        
        </Col>
          {isLoading ? 
          <Col>
          <div className='loading'>
          {
            isLoading ? <LoadingSpinner /> : ''
          } 
          </div>
          <Uploaded uploaded={uploaded} /> 
        </Col> 
        : ""}
      </Row>
      <Row className='mt-3'>
        <Col>

          {/* <Button  >Check for Duplicate</Button> */}

        </Col>

        <Col>

        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default WorkerProfile


// style={{width:'100%', height:'20em',overflow:'scroll'}}
 // const handleClick = () => {
  //   const carList= [{id:1,name:'mercedes'}, {id:2,name:'lamborghini'}, {id:3,name:'bmw'}, {id:4,name:'honda'}, {id:5,name:'chrysler'}, {id:6,name:'toyota'}];
  //   const array = [{id:1,name:'mercedes'}, {id:2,name:'lamborghini'}];
  //   const tempData = webmis.filter(element => {
  //     return !inaData.some(item => item.eM_Key === element.enrolL_NO)

  //   });
  //   setResData(tempData)

  //   const myData = webmis.filter(u => inaData.findIndex(fi=>fi.eM_Key === u.enrolL_NO)=== -1);
  //   console.log(myData)   
  // }