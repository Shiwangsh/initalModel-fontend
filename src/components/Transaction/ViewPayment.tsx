import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ViewPayment = ({ payment, card }: any) => {
  const navigate = useNavigate();
  console.log(payment);
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
                  <Link to="../../dashboard" style={{ color: "#23abc0" }}>
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="../cards" style={{ color: "#23abc0" }}>
                    Cards
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    to="../viewCard"
                    state={{ card: card }}
                    style={{ color: "#23abc0" }}
                  >
                    Card Profile
                  </Link>
                </li>

                <li
                  className="breadcrumb-item active font-weight-bold"
                  aria-current="page"
                >
                  Payment Details
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

        {payment.map((payment: any, index: any) => {
          return (
            <div key={index}>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">payment Id</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{payment._id}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Amount</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{payment.amount.toFixed(2)}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Previous Amount</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {payment.balanceBefore.toFixed(2)}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Balance updated to</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {payment.balanceAfter.toFixed(2)}
                  </p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Created At</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{payment["createdAt"]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ViewPayment;
