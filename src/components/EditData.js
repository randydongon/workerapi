import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const EditData = ({show, setShow, data, handleSaveEditItem}) => {   
    const[pn, setPn] = useState("")
    const[subpn, setSubPn] = useState("")
    const handleClose = () => {
        
        setShow(false)
    };
   
    const handlePn = (e)=>{
      const val = e.target.value;
      setPn(val)
      
    }

    const handleSubpn = (e)=>{
        const val = e.target.value;
        setSubPn(val)
        
    }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit PN or PN Sub Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>            
            <Form.Group
              className="mb-3"
            //   controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>PNSUB NUMBER</Form.Label>
              <Form.Control type="text" rows={3} 
              placeholder='Enter PN Sub Number'
              value={subpn}
              onChange={handleSubpn}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSaveEditItem(pn,subpn)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditData