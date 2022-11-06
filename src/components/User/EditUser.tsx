import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import AuthHeader from "../../services/auth-header";

const EditUser = ({ user, onActionChange }: any | (() => any)) => {
  let navigate = useNavigate();
  // console.log(user);
  const defaultUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
    contactNumber: user.contactNumber,
    userType: user.userType,
  };
  const [fieldValue, setFieldValue] = useState(defaultUser);

  const [error, setError] = useState<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFieldValue({
      ...fieldValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = `http://localhost:9090/users/${defaultUser.id}`;
    await axios
      .patch(url, fieldValue, {
        headers: AuthHeader(),
      })
      .then((res) => {
        console.log(res.data.user);

        navigate(0);
        onActionChange("view");
        navigate("../userProfile", { state: { user: res.data.user } });
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
                    <Link to="../../dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="../users">Users</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Edit User Profile
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
                <p className="mb-0">User Type</p>
              </div>
              <div className="col-sm-9">
                <Form.Select
                  aria-label="Default select example"
                  className=" w-25"
                  name="userType"
                  onChange={handleChange}
                  value={fieldValue.userType}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
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

export default EditUser;
