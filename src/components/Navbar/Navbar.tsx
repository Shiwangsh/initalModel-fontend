import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./style.css";
import {
  faUsers,
  faCreditCard,
  faBusSimple,
  faRoute,
  faTicket,
  faMoneyBills,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import LoginDropDown from "../Login/LoginDropDown";

function Navibar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/dashboard/home"}>
            Admin Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"users"}>
                <FontAwesomeIcon icon={faUsers} className="pr-1" />
                Users
              </Nav.Link>
              <Nav.Link as={Link} to={"transactions"}>
                <FontAwesomeIcon icon={faTicket} className="pr-1" />
                Transactions
              </Nav.Link>
              <Nav.Link as={Link} to={"cards"}>
                <FontAwesomeIcon icon={faCreditCard} className="pr-1" />
                Cards
              </Nav.Link>
              <Nav.Link as={Link} to={"buses"}>
                <FontAwesomeIcon icon={faBusSimple} className="pr-1" />
                Buses
              </Nav.Link>
              <Nav.Link as={Link} to={"routes"}>
                <FontAwesomeIcon icon={faRoute} className="pr-1" />
                Routes
              </Nav.Link>
              <Nav.Link as={Link} to={"loadBalance"}>
                <FontAwesomeIcon icon={faMoneyBills} className="pr-1" />
                Load Balance
              </Nav.Link>
              <Nav.Link as={Link} to={"simulateTap"}>
                <FontAwesomeIcon icon={faRobot} className="pr-1" />
                Simulate Tap
              </Nav.Link>
            </Nav>

            <LoginDropDown />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navibar;
