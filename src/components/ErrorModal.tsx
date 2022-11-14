import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ErrorModal = ({ text, closePopup }: any | (() => any)) => {
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Error❌</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={() => closePopup(true)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  //   return (
  //     <>

  //       {console.log(text)}

  //       <Modal show={true}>
  //         <Modal.Title>Modal heading</Modal.Title>
  //         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="secondary" onClick={handleClose}>
  //             Close
  //           </Button>
  //           <Button variant="primary" onClick={handleClose}>
  //             Save Changes
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     </>
  //   );
};

export default ErrorModal;
