import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";
import ErrorModal from "../ErrorModal";

const EditBus = ({ bus, closePopup }: any | (() => any)) => {
  const navigate = useNavigate();
  const defaultBus = {
    id: bus._id,
    regNum: bus.regNum,
    capacity: bus.capacity,
    route: bus.route,
  };

  //   useEffect(() => {
  //     if (defaultBus) setShow(true);
  //   }, [defaultBus]);

  //   const [show, setShow] = useState(true);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const [error, setError] = useState<any>();

  const [fieldValue, setFieldValue] = useState(defaultBus);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFieldValue({
      ...fieldValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(fieldValue);
    const url = `http://localhost:9090/buses`;
    await axios
      .patch(url, fieldValue, { headers: authHeader() })
      .then((res) => {
        console.log(res);
        navigate(0);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setError(error.response.data.message);
        } else {
          console.log("Error", error);
        }
      });
  };
  return (
    <Modal show={true} onHide={() => closePopup(true)}>
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : null}
      <Modal.Header closeButton>
        <Modal.Title>Edit Bus 🚌</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Reg Num:</p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control rounded-left "
                name="regNum"
                value={fieldValue.regNum}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Capacity</p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control rounded-left"
                name="capacity"
                value={fieldValue.capacity}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Route ID</p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control rounded-left"
                name="route"
                value={fieldValue.route}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
        <Button variant="primary" onClick={() => closePopup(true)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBus;
