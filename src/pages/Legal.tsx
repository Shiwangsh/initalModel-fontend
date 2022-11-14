import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import logo from "../yatri.png";
const Legal = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-5">
        <Card.Title className="text-center">
          <img
            src={logo}
            alt="logo.png"
            height={"200px"}
            width={"200px"}
            onClick={() => navigate("/dashboard/home")}
            style={{ cursor: "pointer" }}
          />
          <br />
          <h1>Legal</h1>
        </Card.Title>
        <Card.Title>Customer Privacy Notice</Card.Title>
        <Card.Text>
          This notice is formulated to provide transparency into our privacy
          practices, in a format that is easy to read, understand and navigate.
        </Card.Text>
        <Card.Title>Information We May Collect</Card.Title>
        <Card.Text>
          We may collect information related to you or your use of Yatri vehicle
          and services in the following manner.
        </Card.Text>
        <Card.Title>About you or your device</Card.Title>
        <Card.Text>
          Yatri Account: Customers who purchase Yatri products will receive a
          Yatri Account. We may collect and process the following types of data
          for your Account that you elect to provide to us: your customer
          registration information; the status of your order; warranty and other
          documentation for your Yatri products; and general information about
          your Yatri products (including, for example, vehicle identification
          number or other product serial numbers, service plan information, or
          connectivity package), insurance forms, driver’s licenses, financing
          agreements, and similar information.
        </Card.Text>
        <Card.Text>
          Yatri Account: Customers who purchase Yatri products will receive a
          Yatri Account. We may collect and process the following types of data
          for your Account that you elect to provide to us: your customer
          registration information; the status of your order; warranty and other
          documentation for your Yatri products; and general information about
          your Yatri products (including, for example, vehicle identification
          number or other product serial numbers, service plan information, or
          connectivity package), insurance forms, driver’s licenses, financing
          agreements, and similar information.
        </Card.Text>
      </div>
      <Footer />
    </>
  );
};

export default Legal;
