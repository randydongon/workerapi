import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UploadSuccessful = ({showModal, setShowModal}) => {
  

  const handleClose = () => setShowModal(false);
  
  return (
    <>
    

    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Profile Sync</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Worker profile from WEBMIS  successfully uploaded to INA.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary">Understood</Button> */}
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default UploadSuccessful