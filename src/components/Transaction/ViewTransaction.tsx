import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import ViewTicket from "./ViewTicket";
import ViewPayment from "./ViewPayment";
import loadData from "../../services/load-data";

const ViewTransaction = () => {
  const location = useLocation();

  const [transaction, setTransaction] = useState<any>(
    location.state.transaction
  );
  const [card, setCard] = useState();
  const [type, setType] = useState<any>();

  const [ticket, setTicket] = useState();
  const [payment, setPayment] = useState();

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getCard = async () => {
      const res = await loadData(
        `http://localhost:9090/cards/${location.state.card}`
      );
      setCard(res.card);
      setFetching(false);
    };
    getCard();
  }, [location.state.card]);

  useEffect(() => {
    const getTicket = async () => {
      const res = await loadData(
        `http://localhost:9090/tickets/${transaction._id}`
      );
      setTicket(res.tickets);
      setFetching(false);
    };

    const getPayment = async () => {
      const res = await loadData(
        `http://localhost:9090/payments/${transaction._id}`
      );
      setPayment(res.payments);
      setFetching(false);
    };
    if (transaction.type === "Ticket") {
      setType("ticket");
      // getTicket();
    } else if (transaction.type === "Load Balance") {
      setType("payment");
      // getPayment();
    }
  }, [transaction._id, transaction.type]);
  if (fetching) return <ReactLoading type="spinningBubbles" color="#000000" />;

  return type === "ticket" && card ? (
    <div>
      <ViewTicket ticket={transaction.ticket} card={card} />
    </div>
  ) : type === "payment" && card ? (
    <ViewPayment payment={transaction.payment} card={card} />
  ) : (
    <>ERROR</>
  );
};

export default ViewTransaction;
