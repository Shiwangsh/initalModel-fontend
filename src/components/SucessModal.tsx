import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SucessModal = ({ text, closePopup }: any | (() => any)) => {
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Success✅</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => closePopup(true)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SucessModal;
