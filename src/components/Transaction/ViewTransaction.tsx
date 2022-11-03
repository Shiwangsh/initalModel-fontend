import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import ViewTicket from "./ViewTicket";
import ViewPayment from "./ViewPayment";

const ViewTransaction = () => {
  const location = useLocation();
  // console.log(location.state.card);

  const [transaction, setTransaction] = useState<any>(
    location.state.transaction
  );
  const [card, setCard] = useState(location.state.card);
  const [type, setType] = useState<any>();

  const [ticket, setTicket] = useState();
  const [payment, setPayment] = useState();

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
        .get(`http://localhost:9090/payments/${transaction._id}`)
        .then((res) => {
          setPayment(res.data.payments);
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
      <ViewTicket ticket={ticket} card={location.state.card} />
    </div>
  ) : type === "payment" ? (
    <ViewPayment payment={payment} card={location.state.card} />
  ) : (
    <>ERROR</>
  );
};

export default ViewTransaction;
