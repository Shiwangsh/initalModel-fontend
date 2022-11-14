import axios from "axios";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";

const DeleteUser = ({ id, closePopup }: any | (() => any)) => {
  let navigate = useNavigate();

  const handleDelete = async () => {
    const url = `http://localhost:9090/users/${id}`;
    await axios.delete(url, { headers: authHeader() });
    navigate("../users");
  };

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Conformation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closePopup(true)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteUser;
