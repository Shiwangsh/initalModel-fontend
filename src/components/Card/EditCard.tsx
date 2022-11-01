import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import axios from "axios";

const EditCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // console.log("location STATE->>>", location.state);
  const [card, setCard] = useState(location.state.card);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      console.log(location.state.card.uuid);

      const url = `http://localhost:9090/tickets/${location.state.card.uuid}`;
      const res = await axios.get(url);
      const { data } = res;
      console.log(data.tickets);
      setTickets(data.tickets);
    };
    getTickets();
  }, [location.state.card.id, location.state.card.uuid]);

  // console.log(card);

  /**
   * * FOR EDIT-- CURRENTLY VIEW ONLY
   *
   */

  // const defaultCard = {
  //   uuid: card.uuid,
  //   balance: card.balance,
  //   cardType: card.type,
  // };
  // const [fieldValue, setFieldValue] = useState(defaultCard);

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFieldValue({
  //     ...fieldValue,
  //     [name]: value,
  //   });
  // };
  // const handleSubmit = async (e: any) => {
  //   e.preventDefult();
  //   const url = `http://localhost:9090/cards/loadbalance`;
  //   await axios.patch(url).then((res) => {
  //     console.log(res.data.user);

  //     navigate(0);
  //     navigate("../cards", { state: { card: res.data.card } });
  //   });
  // };
  //   const [error, setError] = useState<any>();
  return (
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
                  <Link to="../cards">Cards</Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  Card Profile
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
              <p className="mb-0">Card ID</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{card.uuid}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Balance</p>
            </div>
            <div className="col-sm-9">
              <p
                className="text-muted mb-0"
                // className="form-control rounded-left w-25"
                // name="balance"
                // value={fieldValue.balance}
                // disabled
                // onChange={handleChange}
              >
                {card.balance}
              </p>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Card Type</p>
            </div>
            <div className="col-sm-9">
              <p className="mb-0">{card.cardType}</p>

              {/* <Form.Select
                aria-label="Default select example"
                className=" w-25"
                name="cardType"
                // onChange={handleChange}
                disabled
                // value={fieldValue.cardType}
              >
                <option value="Standard">Standard</option>
                <option value="Student">Student</option>
                <option value="Senior">Senior</option>
              </Form.Select> */}
            </div>
          </div>
        </div>
        {/* <button type="submit" className="btn btn-success w-25">
          Submit
        </button> */}
      </div>
      {/* SHOW ALL THE TRANSACTIONS OF THE CARD */}
      <div className="login-wrap p-4">
        <h3>Transactions</h3>
        <Table striped borderless hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Route</th>
              <th>Stops</th>
              <th>Card</th>
              <th>Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => {
              return (
                <tr key={index}>
                  <td>{ticket["_id"]}</td>
                  <td>{ticket["amount"]}</td>
                  <td>{ticket["routeName"]}</td>
                  <td>
                    {ticket["firstStop"]} - {ticket["lastStop"]}
                  </td>
                  <td>{ticket["card"]}</td>
                  <td>{ticket["createdAt"]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </section>
    // <Modal show={true}>
    //   <Modal.Header>
    //     <Modal.Title>Conformation</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={() => closePopup(true)}>
    //       Close
    //     </Button>
    //     <Button variant="danger" onClick={() => closePopup(true)}>
    //       Delete
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
  );
};

export default EditCard;
