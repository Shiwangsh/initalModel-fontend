import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../ErrorModal";
import SucessModal from "../SucessModal";
import authHeader from "../../services/auth-header";
import { Button } from "react-bootstrap";

const CreateStaff = () => {
  const [fieldValue, setFieldValue] = useState<any>();
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

    const url = `http://localhost:9090/staffs/`;
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
                    <Link to="../staffs" style={{ color: "#23abc0" }}>
                      Staffs
                    </Link>
                  </li>

                  <li
                    className="breadcrumb-item active font-weight-bold"
                    aria-current="page"
                  >
                    Create Staff
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
                  //   value={fieldValue.name}
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
                  //   value={fieldValue.email}
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
                  //   value={fieldValue.email}
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
                  //   value={fieldValue.contactNumber}
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
                  //   value={fieldValue.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Role</p>
              </div>
              <div className="col-sm-9">
                <Form.Select
                  aria-label="Default select example"
                  className=" w-25"
                  name="staffType"
                  onChange={handleChange}
                  defaultValue="User"

                  //   value="User"
                >
                  <option>Select an Option</option>
                  <option value="Admin">Admin</option>
                  <option value="Level1">Level1</option>
                  <option value="Level2">Level2</option>
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

export default CreateStaff;
