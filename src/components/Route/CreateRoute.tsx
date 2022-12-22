import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../Modals/ErrorModal";
import SucessModal from "../Modals/SucessModal";

const CreateRoute = () => {
  const [routeName, setRouteName] = useState<any>();
  const [fieldValues, setFieldValues] = useState<any>();
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>(false);
  const [stops, setStops] = useState<any>([
    // {
    //   name: "",
    //   number: 0,
    //   distance: 0,
    //   latitude: 0,
    //   longitude: 0,
    // },
  ]);

  const navigate = useNavigate();

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFieldValue({
  //     ...fieldValue,
  //     [name]: value,
  //   });
  // };

  const handleStopChange = (e: any) => {
    const { name, value } = e.target;
    setStops([
      {
        ...stops,
        [name]: value,
      },
    ]);
  };

  const handleSubmit2 = async (e: any) => {
    e.preventDefault();
    setFieldValues({
      routeName,
      ...stops,
    });
    console.log(fieldValues);
    console.log(stops);
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   console.log(fieldValue);

  //   const url = `http://localhost:9090/Routees/`;
  //   await axios
  //     .post(url, fieldValue)
  //     .then((res) => {
  //       console.log(res);

  //       setSuccess(true);
  //       setTimeout(() => navigate(0), 1000);
  //     })
  //     .catch((error) => {
  //       // console.log(error.response.data.message);
  //       if (error.response) {
  //         console.log(error.response);
  //         setError(error.response.data.message);
  //       } else {
  //         console.log("Error", error);
  //       }
  //     });
  // };
  return (
    <form onSubmit={handleSubmit2}>
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : null}
      {success ? (
        <SucessModal
          text="Route created"
          closePopup={() => setSuccess(false)}
        />
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
                    <Link to="../../dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="../Routes">Routes</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Create Route
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
                <p className="mb-0">Route Name</p>
              </div>
              <div className="col-sm-9">
                <input
                  className="form-control rounded-left w-25"
                  name="routeName"
                  //   value={fieldValue.name}
                  onChange={(e) => setRouteName(e.target.value)}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Stops : </p>
              </div>
            </div>
            {/* <hr /> */}
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Stop Name</p>
              </div>
              <div className="col-sm-6">
                <input
                  className="form-control rounded-left w-25"
                  name="name"
                  //   value={fieldValue.email}
                  onChange={handleStopChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Stop Number</p>
              </div>
              <div className="col-sm-6">
                <input
                  className="form-control rounded-left w-25"
                  name="number"
                  //   value={fieldValue.email}
                  onChange={handleStopChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Distance</p>
              </div>
              <div className="col-sm-6">
                <input
                  className="form-control rounded-left w-25"
                  name="distance"
                  //   value={fieldValue.email}
                  onChange={handleStopChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">latitude</p>
              </div>
              <div className="col-sm-6">
                <input
                  className="form-control rounded-left w-25"
                  name="latitude"
                  //   value={fieldValue.email}
                  onChange={handleStopChange}
                />
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">longitude</p>
              </div>
              <div className="col-sm-6">
                <input
                  className="form-control rounded-left w-25"
                  name="longitude"
                  //   value={fieldValue.email}
                  onChange={handleStopChange}
                />
              </div>
            </div>
          </div>

          <hr />
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Stops : </p>
            </div>
          </div>
          {/* <hr /> */}
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Stop Name</p>
            </div>
            <div className="col-sm-6">
              <input
                className="form-control rounded-left w-25"
                name="name"
                //   value={fieldValue.email}
                onChange={handleStopChange}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Stop Number</p>
            </div>
            <div className="col-sm-6">
              <input
                className="form-control rounded-left w-25"
                name="number"
                //   value={fieldValue.email}
                onChange={handleStopChange}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Distance</p>
            </div>
            <div className="col-sm-6">
              <input
                className="form-control rounded-left w-25"
                name="distance"
                //   value={fieldValue.email}
                onChange={handleStopChange}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">latitude</p>
            </div>
            <div className="col-sm-6">
              <input
                className="form-control rounded-left w-25"
                name="latitude"
                //   value={fieldValue.email}
                onChange={handleStopChange}
              />
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">longitude</p>
            </div>
            <div className="col-sm-6">
              <input
                className="form-control rounded-left w-25"
                name="longitude"
                //   value={fieldValue.email}
                onChange={handleStopChange}
              />
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

export default CreateRoute;
