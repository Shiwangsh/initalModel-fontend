import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import axios from "axios";

const ViewUser = ({ user, onActionChange }: any | (() => any)) => {
  const [open, setOpen] = useState<any>(false);
  const [deleteID, setDeleteID] = useState<any>();
  const [card, setCard] = useState();
  const [cardID, setCardID] = useState();

  const navigate = useNavigate();

  const handleDelete = () => {
    setOpen(true);
    setDeleteID(user._id);
  };

  useEffect(() => {
    const getCardDetails = async (userID: any) => {
      const url = `http://localhost:9090/cards/user/${userID}`;
      const res = await axios.get(url);
      console.log(res.data.card);
      setCard(res.data.card);
      // console.log(card);

      setCardID(res.data.card.uuid);
    };
    getCardDetails(user._id);
  }, [user._id]);

  const navigateToCard = (e: any) => {
    e.preventDefault();
    navigate("../editCard", { state: { card: card } });
  };

  return (
    <>
      {open ? (
        <DeleteUser id={user._id} closePopup={() => setOpen(false)} />
      ) : null}

      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
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
                    User Profile
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
              <div className="d-flex flex-row-reverse pb-2">
                <Button
                  variant="danger"
                  onClick={() => handleDelete()}
                  className="ml-3"
                >
                  <FontAwesomeIcon icon={faTrash} className="pl-1" />
                </Button>
                <Button variant="info" onClick={() => onActionChange("edit")}>
                  <FontAwesomeIcon icon={faPenToSquare} className="pl-1" />
                </Button>
              </div>
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
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Card</p>
                      </div>
                      <div className="col-sm-9">
                        <Button onClick={(e) => navigateToCard(e)}>
                          {cardID}
                        </Button>
                      </div>
                    </div>
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

export default ViewUser;
