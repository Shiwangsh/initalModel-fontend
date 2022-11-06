import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">401</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> User not authorized.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
