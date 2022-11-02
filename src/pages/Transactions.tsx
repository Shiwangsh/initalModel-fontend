import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../components/Search/Search";
import ReactLoading from "react-loading";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [transactions, settransactions] = useState([]);

  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState(" ");
  const navigate = useNavigate();

  // Get transactions
  useEffect(() => {
    const getTransactions = async () => {
      const url = `http://localhost:9090/Transactions?search=${search}`;
      const res = await axios.get(url);
      const { data } = res;
      settransactions(data.transactions);
      setFetching(false);
    };
    getTransactions();
  }, [search]);

  const getCardOnClick = async (
    cardID: any,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    const url = ` http://localhost:9090/cards/${cardID}`;
    const res = await axios.get(url);
    const { data } = res;
    navigate("../viewCard", { state: { card: data.card } });
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
              <th>ID</th>
              <th>Status</th>
              <th>Type</th>
              <th>Card</th>
              {/* <th>Date and Time</th> */}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>
                    <small>{transaction["_id"]}</small>
                  </td>
                  <td>{transaction["status"]}</td>
                  <td>{transaction["type"]}</td>
                  <td>
                    <Button
                      onClick={(e) => getCardOnClick(transaction["card"], e)}
                    >
                      {transaction["card"]}
                    </Button>
                  </td>
                  {/* <td>{transaction["createdAt"]}</td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/*
      {openEdit ? (
        // setOpenEdit(true) // wait 2 seconds then execute
        <Edittransaction id={currenttransaction} closePopup={() => setOpenEdit(false)} />
      ) : null} */}
    </>
  );
};

export default Transactions;
