import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmDialog = ({ show, proceed, setShow, setProceed }) => {
    const handleClose = () => setShow(false);
    const handleCancel = ()=>{
        setProceed(false)
        setShow(false);
    }

    const handleProceed = ()=>{
        setProceed(true);
        setShow(false)
    }

    return (
        <>
            <Modal onHide={show} show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to proceed upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        Are you sure to proceed?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCancel}>CANCEL</Button> &nbsp;
                    <Button variant='primary' onClick={handleProceed}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>



    )
}





// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
export default ConfirmDialog