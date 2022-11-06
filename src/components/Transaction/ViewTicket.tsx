import axios from "axios";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ViewTicket = ({ ticket, card }: any) => {
  const navigate = useNavigate();
  console.log(card);
  return (
    <section style={{ backgroundColor: "#ffffff" }}>
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
                  <Link to="../cards">Cards</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="../viewCard" state={{ card: card }}>
                    Card Profile
                  </Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  Ticket Details
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="card-body shadow">
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Card Id</p>
          </div>
          <div className="col-sm-9">
            <Button
              variant="outline-info"
              onClick={(e) =>
                navigate("../viewCard", {
                  state: {
                    card: card,
                  },
                })
              }
            >
              {card.uuid}
            </Button>
          </div>
        </div>
        <hr />

        {ticket.map((ticket: any, index: any) => {
          return (
            <div key={index}>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Ticket Id</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{ticket._id}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Amount</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{ticket.amount}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Route</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{ticket["routeName"]}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Stops</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {ticket["firstStop"]} - {ticket["lastStop"]}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Created At</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{ticket["createdAt"]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ViewTicket;
