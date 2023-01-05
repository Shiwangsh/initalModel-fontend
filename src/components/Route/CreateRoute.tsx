import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../Modals/ErrorModal";
import SucessModal from "../Modals/SucessModal";
import StopFields from "./StopFields";
import authHeader from "../../services/auth-header";

const CreateRoute = () => {
  const [routeName, setRouteName] = useState<any>();
  const [numberOfStops, setNumberOfStops] = useState<any>(0);
  const [error, setError] = useState<Boolean>();
  const [success, setSuccess] = useState<Boolean>(false);

  // const navigate = useNavigate();

  const handleSubmit = async (e: any, stops: any) => {
    e.preventDefault();
    const url = `http://localhost:9090/Routes/`;
    await axios
      .post(url, { routeName, stops }, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);

        setSuccess(true);
        // setTimeout(() => navigate(0), 1000);
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
    <div>
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
                    <Link to="../../dashboard" style={{ color: "#23abc0" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="../Routes" style={{ color: "#23abc0" }}>
                      Routes
                    </Link>
                  </li>

                  <li
                    className="breadcrumb-item active font-weight-bold"
                    aria-current="page"
                  >
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
                  onChange={(e) => setRouteName(e.target.value)}
                />
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Enter the number of Stops:</p>
              </div>
              <div className="col-sm-9">
                <input
                  className="form-control rounded-left w-25"
                  name="numberOfStops"
                  onChange={(e) => setNumberOfStops(e.target.value)}
                />
              </div>
            </div>
          </div>

          {numberOfStops > 0 ? (
            <StopFields
              numberOfFeilds={numberOfStops}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default CreateRoute;

//<div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">Stops : </p>
//   </div>
// </div>
{
  /* <hr /> */
}
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">Stop Name</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="name"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>
// <hr />
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">Stop Number</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="number"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>
// <hr />
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">Distance</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="distance"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>
// <hr />
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">latitude</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="latitude"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>

// <hr />
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">longitude</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="longitude"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>

// <hr />
// <hr />
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">Stops : </p>
//   </div>
// </div>
// {/* <hr /> */}
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">Stop Name</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="name"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>
// <hr />
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">Stop Number</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="number"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>
// <hr />
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">Distance</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="distance"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>
// <hr />
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">latitude</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="latitude"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>

// <hr />
// <div className="row">
//   <div className="col-sm-3">
//     <p className="mb-0">longitude</p>
//   </div>
//   <div className="col-sm-6">
//     <input
//       className="form-control rounded-left w-25"
//       name="longitude"
//       //   value={fieldValue.email}
//       onChange={handleStopChange}
//     />
//   </div>
// </div>
