import React from 'react'
import './WorkerProfile.css'
import { Spinner, Button } from 'react-bootstrap';


const LoadingSpinner = () => {
  return (
    <div className='load-spinner'>
      
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        &nbsp;
        <h6>Uploading...</h6>
      
    </div>
  )
}

export default LoadingSpinner