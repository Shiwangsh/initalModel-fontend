import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsProgress,
  faEye,
  faMoneyBill1Wave,
  faMoneyBillTransfer,
  faTicket,
  faTrain,
  faTrainSubway,
} from "@fortawesome/free-solid-svg-icons";
import authHeader from "../../services/auth-header";
import ErrorModal from "../ErrorModal";
import loadData from "../../services/load-data";

const ViewCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("location STATE->>>", location.state);
  const [card, setCard] = useState(location.state.card);
  const [cardUser, setCardUser] = useState();
  const [transactions, setTransactions] = useState<any>();
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      const url = `http://localhost:9090/transactions/${card.uuid}`;
      await axios
        .get(url)
        .then((res) => {
          const { data } = res;
          setTransactions(data.transaction);
          setFetching(false);
        })
        .catch((error) => console.log(error));
    };
    getTransactions();
  }, [card.uuid, location.state]);

  // console.log(transactions);

  const getUserOnClick = async (
    userID: any,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    const url = ` http://localhost:9090/users/${userID}`;
    const res = await axios.get(url, {
      headers: authHeader(),
    });
    const { data } = res;
    // console.log(data);
    console.log(data.user);
    setCardUser(data.user);
    if (!data.user) setError(true);
  };

  useEffect(() => {
    if (cardUser)
      navigate("../userProfile", {
        state: { user: cardUser },
      });
  }, [navigate, cardUser, error]);

  if (fetching) return <ReactLoading type="spinningBubbles" color="#000000" />;

  return (
    <section style={{ backgroundColor: "#eee" }}>
      {error ? (
        <ErrorModal
          text="User for the card was deleted"
          closePopup={() => setError(false)}
        />
      ) : null}
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
              <p className="text-muted mb-0">{card.balance}</p>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Card Type</p>
            </div>
            <div className="col-sm-9">
              <p className="mb-0">{card.cardType}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">User</p>
            </div>
            <div className="col-sm-9">
              <Button
                variant="outline-info"
                onClick={(e) => getUserOnClick(card.user, e)}
              >
                {card.user}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3>Transactions</h3>
        <Table striped bordered responsive size="sm">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: any, index: any) => {
              return (
                <tr key={index}>
                  <td>
                    <small>{transaction["_id"]}</small>
                  </td>

                  {transaction["status"] === "Open" ? (
                    <td>
                      <span className="badge badge-pill badge-success">
                        {transaction["status"]}
                      </span>
                    </td>
                  ) : (
                    <td>
                      <span className="badge badge-pill badge-danger">
                        {transaction["status"]}
                      </span>
                    </td>
                  )}

                  {/* <td>{transaction["status"]}</td> */}

                  {transaction["type"] === "Ticket" ? (
                    <td>
                      <span className="badge badge-">
                        <FontAwesomeIcon
                          icon={faTrainSubway}
                          className="pl-2"
                          color="#b33059"
                        />
                      </span>
                    </td>
                  ) : (
                    <td>
                      {/* {transaction["type"]} */}
                      <FontAwesomeIcon
                        icon={faMoneyBill1Wave}
                        className="pl-2"
                        color="#32a852"
                      />
                    </td>
                  )}

                  {/* <td>{transaction["type"]}</td> */}
                  <td>{transaction["createdAt"]}</td>
                  <td>
                    <Button
                      variant="none"
                      onClick={() =>
                        navigate("../viewTransaction", {
                          state: { transaction: transaction, card: card },
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faEye} color="#0b7312" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default ViewCard;

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
