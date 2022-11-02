import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import ViewTicket from "./ViewTicket";
import ViewPaymnet from "./ViewPaymnet";

const ViewTransaction = () => {
  const location = useLocation();

  const [transaction, setTransaction] = useState<any>(
    location.state.transaction
  );
  const [type, setType] = useState<any>();

  const [ticket, setTicket] = useState();
  const [payment, setPaymnet] = useState();

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getTicket = async () => {
      await axios
        .get(`http://localhost:9090/tickets/${transaction._id}`)
        .then((res) => {
          setTicket(res.data.tickets);
          setFetching(false);
        });
    };

    const getPayment = async () => {
      await axios
        .get(`http://localhost:9090/paymnets/${transaction._id}`)
        .then((res) => {
          setPaymnet(res.data.tickets);
          setFetching(false);
        });
    };
    if (transaction.type === "Ticket") {
      setType("ticket");
      getTicket();
    } else if (transaction.type === "Load Balance") {
      setType("payment");
      getPayment();
    }
  }, [transaction._id, transaction.type]);
  if (fetching) return <ReactLoading type="spinningBubbles" color="#000000" />;

  return type === "ticket" ? (
    <div>
      <ViewTicket ticket={ticket} />
    </div>
  ) : type === "paymnet" ? (
    <ViewPaymnet paymnet={payment} />
  ) : (
    <>ERROR</>
  );
};

export default ViewTransaction;
