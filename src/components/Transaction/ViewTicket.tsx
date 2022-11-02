import axios from "axios";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewTicket = ({ ticket }: any) => {
  //   console.log(ticket);
  const navigate = useNavigate();

  const getCardOnClick = async (
    cardID: any,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    const url = ` http://localhost:9090/cards/${cardID}`;
    const res = await axios.get(url);
    const { data } = res;
    console.log(data.card);
    navigate("../editCard", { state: { card: data.card } });
  };

  return (
    <div className="card-body shadow">
      {ticket.map((ticket: any, index: any) => {
        return (
          <>
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
            {/* <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Card</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {" "}
                  <Button onClick={(e) => getCardOnClick(ticket["card"], e)}>
                    {ticket["card"]}
                  </Button>
                </p>
              </div>
            </div>
            <hr /> */}
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Created At</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{ticket["createdAt"]}</p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ViewTicket;
