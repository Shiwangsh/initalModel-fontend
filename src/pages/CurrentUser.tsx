import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  return (
    <>
      {/* {open ? (
        <DeleteUser id={user._id} closePopup={() => setOpen(false)} />
      ) : null} */}

      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Your User Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 mt-5">
              <div className="card mb-4 shadow">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">{user.name}</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4 shadow">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.contactNumber}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.address}</p>
                    </div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">User Type</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.userType}</p>
                    </div>
                  </div>

                  <hr />
                  {/* <div className="row"> */}
                  <div className="col-sm-9">
                    Contact Shiwangsh to edit your data
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentUser;
