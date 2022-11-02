import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ViewCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // console.log("location STATE->>>", location.state);
  const [card, setCard] = useState(location.state.card);
  const [transactions, setTransactions] = useState<any>();
  const [fetching, setFetching] = useState(true);

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

  if (fetching) return <ReactLoading type="spinningBubbles" color="#000000" />;

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
      <h3>Transactions</h3>
      <Table striped borderless hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Type</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: any, index: any) => {
            return (
              <tr key={index}>
                <td>
                  <small>{transaction["_id"]}</small>
                </td>
                <td>{transaction["status"]}</td>
                <td>{transaction["type"]}</td>
                <td>{transaction["createdAt"]}</td>
                <td>
                  <Button
                    onClick={() =>
                      navigate("../viewTransaction", {
                        state: { transaction: transaction },
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
};

export default ViewCard;
