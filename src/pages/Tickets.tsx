import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../components/Search/Search";
import ReactLoading from "react-loading";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState(" ");
  const navigate = useNavigate();

  // Get Tickets
  useEffect(() => {
    const gettickets = async () => {
      const url = `http://localhost:9090/tickets?search=${search}`;
      const res = await axios.get(url);
      const { data } = res;
      setTickets(data.tickets);
      setFetching(false);
    };
    gettickets();
  }, [search]);

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

  if (fetching) return <ReactLoading type="bubbles" color="#000000" />;
  return (
    <>
      <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter ID to search"
      />

      <div className="m-2">
        <Table striped borderless hover responsive>
          <thead>
            <tr>
              <th>UUID</th>
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
                  <td>
                    <small>{ticket["uuid"]}</small>
                  </td>
                  <td>{ticket["amount"]}</td>
                  <td>{ticket["routeName"]}</td>
                  <td>
                    {ticket["firstStop"]} - {ticket["lastStop"]}
                  </td>
                  <td>
                    <Button onClick={(e) => getCardOnClick(ticket["card"], e)}>
                      {ticket["card"]}
                    </Button>
                  </td>
                  <td>{ticket["createdAt"]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* 
      {openEdit ? (
        // setOpenEdit(true) // wait 2 seconds then execute
        <Editticket id={currentticket} closePopup={() => setOpenEdit(false)} />
      ) : null} */}
    </>
  );
};

export default Tickets;
