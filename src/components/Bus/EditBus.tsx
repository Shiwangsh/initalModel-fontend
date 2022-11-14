import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";
import loadData from "../../services/load-data";
import ErrorModal from "../ErrorModal";
import Form from "react-bootstrap/Form";

const EditBus = ({ bus, closePopup }: any | (() => any)) => {
  const navigate = useNavigate();
  const defaultBus = {
    id: bus._id,
    regNum: bus.regNum,
    capacity: bus.capacity,
    route: bus.route,
  };

  const [error, setError] = useState<any>();

  const [fieldValue, setFieldValue] = useState(defaultBus);
  const [routes, setRoutes] = useState<any>();

  useEffect(() => {
    const getRoutes = async () => {
      const data = await loadData("http://localhost:9090/routes");
      setRoutes(data.routes);
    };
    getRoutes();
  }, []);

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
              <Form.Select
                // className="w-25"
                name="route"
                onChange={handleChange}
              >
                <option value="">Select a Route</option>
                {routes
                  ? routes.map((route: any, index: any) => (
                      <option value={route["_id"]} key={index}>
                        {route["routeName"]}
                      </option>
                    ))
                  : null}
              </Form.Select>
            </div>
          </div>
          <hr />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
        <Button variant="info" onClick={() => closePopup(true)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBus;
