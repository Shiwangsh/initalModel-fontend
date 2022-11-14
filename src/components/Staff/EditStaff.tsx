import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import AuthHeader from "../../services/auth-header";

const EditStaff = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);
  let navigate = useNavigate();
  //   console.log(user);
  const defaultUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    address: user.address,
    contactNumber: user.contactNumber,
    staffType: user.staffType,
  };
  const [fieldValue, setFieldValue] = useState(defaultUser);

  const [error, setError] = useState<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFieldValue({
      ...fieldValue,
      [name]: value,
    });
    console.log(fieldValue);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = `http://localhost:9090/staffs/${defaultUser.id}`;
    await axios
      .patch(url, fieldValue, {
        headers: AuthHeader(),
      })
      .then((res) => {
        console.log(res.data.staff);
        navigate("../staffs");
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
    <form onSubmit={handleSubmit}>
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
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
                    Edit Staff Profile
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
                  value={fieldValue.name}
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
                  value={fieldValue.email}
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
                  value={fieldValue.password}
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
                  value={fieldValue.contactNumber}
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
                  value={fieldValue.address}
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
                  value={fieldValue.staffType}
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
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default EditStaff;
