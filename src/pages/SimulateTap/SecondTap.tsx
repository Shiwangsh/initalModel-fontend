import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import ErrorModal from "../../components/ErrorModal";
import SucessModal from "../../components/SucessModal";
import loadData from "../../services/load-data";
import Form from "react-bootstrap/Form";

const SecondTap = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldValue, setFieldValue] = useState<any>();
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

  const handleSubmit = async () => {
    const url = `http://localhost:9090/cards/secondTap`;
    await axios
      .post(url, fieldValue)
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          console.log("Error", error);
        }
      });
  };

  return (
    <div className="card m-4">
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : null}
      {success ? (
        <SucessModal
          text="Travel complete🚌👌"
          closePopup={() => setSuccess(false)}
        />
      ) : null}
      <div className="card-body">
        <h3>Second Tap</h3>

        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Card UUID</p>
          </div>
          <div className="col-sm-9">
            <input
              className="form-control rounded-left w-50"
              name="cardID"
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Route</p>
          </div>
          <div className="col-sm-9">
            <Form.Select
              className="w-25"
              name="routeID"
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

        {/* <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Route ID</p>
          </div>
          <div className="col-sm-9">
            <input
              className="form-control rounded-left w-50"
              name="routeID"
              onChange={handleChange}
            />
          </div>
        </div> */}
        <br />

        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">First Stop</p>
          </div>
          <div className="col-sm-9">
            <input
              className="form-control rounded-left w-25"
              name="firstStop"
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Last Stop</p>
          </div>
          <div className="col-sm-9">
            <input
              className="form-control rounded-left w-25"
              name="lastStop"
              onChange={handleChange}
            />
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-sm-3">
            <Button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondTap;
