import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../components/Search/Search";
import ReactLoading from "react-loading";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomPagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faEye,
  faMoneyBillTransfer,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";

const Transactions = () => {
  const [transactions, settransactions] = useState([]);
  const [card, setCard] = useState();

  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState(" ");

  const [showData, setShowData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (transactions) setShowData(transactions.slice(0, 10));
  }, [transactions]);

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
    setCard(data.card);
    navigate("../viewCard", { state: { card: data.card } });
  };

  // Paginaton handel
  const handleClick = (page: any) => {
    setCurrentPage(page);
    const pageIndex = page - 1;
    const firstIndex = pageIndex * 10;
    const lastIndex = pageIndex * 10 + 10;
    setShowData(transactions.slice(firstIndex, lastIndex));
  };

  if (fetching) return <ReactLoading type="bubbles" color="#000000" />;
  return (
    <>
      <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter ID to search"
      />

      <div className="m-2">
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Type</th>
              <th>Card</th>
              <th>Action</th>
              {/* <th>Date and Time</th> */}
            </tr>
          </thead>
          <tbody>
            {showData.map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>
                    <small>{transaction["_id"]}</small>
                  </td>
                  {transaction["status"] === "Open" ? (
                    <td>
                      <FontAwesomeIcon
                        icon={faMoneyBillTransfer}
                        color="green"
                      />
                    </td>
                  ) : (
                    <td>
                      {
                        <FontAwesomeIcon
                          icon={faMoneyBillTransfer}
                          color="red"
                        />
                      }
                    </td>
                  )}
                  <td>{transaction["type"]}</td>
                  <td>
                    <Button
                      variant="outline-dark"
                      onClick={(e) => getCardOnClick(transaction["card"], e)}
                    >
                      {transaction["card"]}
                    </Button>
                  </td>

                  <td>
                    <Button
                      variant="none"
                      onClick={(e) =>
                        navigate("../viewTransaction", {
                          state: {
                            transaction: transaction,
                            card: { uuid: "BUG FIX LATER" },
                          },
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faEye} color="#0b7312" />
                    </Button>
                  </td>

                  {/* <td>{transaction["createdAt"]}</td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <CustomPagination
          dataPerPage={10}
          totalData={transactions.length}
          paginate={handleClick}
        />
      </div>
    </>
  );
};

export default Transactions;
