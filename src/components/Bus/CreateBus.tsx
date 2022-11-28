import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../ErrorModal";
import SucessModal from "../SucessModal";
import loadData from "../../services/load-data";
import Form from "react-bootstrap/Form";
import authHeader from "../../services/auth-header";

const CreateBus = () => {
  const [fieldValue, setFieldValue] = useState<any>();
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>(false);
  const [routes, setRoutes] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    const getRoutes = async () => {
      const data = await loadData("http://localhost:9090/routes");
      setRoutes(data.data.data);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(fieldValue);

    const url = `http://localhost:9090/Buses/`;
    await axios
      .post(url, fieldValue, { headers: authHeader() })
      .then((res) => {
        console.log(res);

        setSuccess(true);
        // setTimeout(() => navigate(0), 1000);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        if (error.response) {
          console.log(error.response);
          setError(error.response.data.message);
        } else {
          console.log("Error", error);
        }
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : null}
      {success ? (
        <SucessModal text="Bus created" closePopup={() => setSuccess(false)} />
      ) : null}
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="../../dashboard" style={{ color: "#23abc0" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="../Buses" style={{ color: "#23abc0" }}>
                      Buses
                    </Link>
                  </li>

                  <li
                    className="breadcrumb-item active font-weight-bold"
                    aria-current="page"
                  >
                    Create Bus
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div className="card m-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Registration Number</p>
              </div>
              <div className="col-sm-9">
                <input
                  className="form-control rounded-left w-25"
                  name="regNum"
                  //   value={fieldValue.name}
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
                  className="form-control rounded-left w-25"
                  name="capacity"
                  //   value={fieldValue.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Route</p>
              </div>
              <div className="col-sm-9">
                <Form.Select
                  className="w-25"
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
          </div>

          <div className="login-wrap p-4">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default CreateBus;
