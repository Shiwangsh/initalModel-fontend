import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../ErrorModal";
import SucessModal from "../SucessModal";
import authHeader from "../../services/auth-header";
import { Button } from "react-bootstrap";

const CreateUser = () => {
  const [fieldValue, setFieldValue] = useState<any>({
    userType: "User",
    cardType: "Standard",
  });
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>(false);

  const navigate = useNavigate();

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

    const url = `http://localhost:9090/users/`;
    await axios
      .post(url, fieldValue, { headers: authHeader() })
      .then((res) => {
        console.log(res);

        setSuccess(true);
        setTimeout(() => navigate(0), 1000);
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
        <SucessModal text="User created" closePopup={() => setSuccess(false)} />
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
                    <Link to="../users" style={{ color: "#23abc0" }}>
                      Users
                    </Link>
                  </li>

                  <li
                    className="breadcrumb-item font-weight-bold"
                    aria-current="page"
                  >
                    Create User
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
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
                <input
                  className="form-control rounded-left w-25"
                  name="name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <input
                  className="form-control rounded-left w-25"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Password</p>
              </div>
              <div className="col-sm-9">
                <input
                  className="form-control rounded-left w-25"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone</p>
              </div>
              <div className="col-sm-9">
                <input
                  className="form-control rounded-left w-25"
                  name="contactNumber"
                  onChange={handleChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <input
                  className="form-control rounded-left w-25"
                  name="address"
                  onChange={handleChange}
                />
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Card Type</p>
              </div>
              <div className="col-sm-9">
                <Form.Select
                  aria-label="Default select example"
                  className=" w-25"
                  name="cardType"
                  defaultValue="Standard"
                  onChange={handleChange}
                >
                  <option value="Student">Student</option>
                  <option value="Senior">Senior</option>
                  <option value="Standard">Standard</option>
                </Form.Select>
              </div>
            </div>
          </div>

          <div className="login-wrap p-4">
            <Button type="submit" variant="outline-success">
              Submit
            </Button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default CreateUser;
