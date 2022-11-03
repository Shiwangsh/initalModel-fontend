import React from "react";
import { Link } from "react-router-dom";

const ViewPayment = ({ payment, card }: any) => {
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
                  Payment Details
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="card-body shadow">
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
                  <p className="mb-0">Previous Amount</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {payment.previousBalance.toFixed(2)}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Update Balance</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {payment.currentBalance.toFixed(2)}
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
