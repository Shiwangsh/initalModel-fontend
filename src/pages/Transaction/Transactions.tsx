import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/Pagination";

import loadData from "../../services/load-data";
import filterResults from "../../services/filter-results";
import TransactionFilter from "../../components/Transaction/TransactionFilter";
import TransactionTable from "../../components/Transaction/TransactionTable";

const Transactions = () => {
  const url = "http://localhost:9090/Transactions";
  const [transactions, settransactions] = useState([]);
  const [card, setCard] = useState();

  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState(" ");

  const navigate = useNavigate();

  //Filter
  const [filter, setFilter] = useState(false);
  const [filterQuery, setFilterQuery] = useState<any>("");
  useEffect(() => {
    if (filterQuery) {
      const getData = async () => {
        const res = await filterResults(url, filterQuery);
        const { data } = res;
        settransactions(data.data);
        setFetching(false);
      };
      getData();
    }
  }, [filterQuery]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [showData, setShowData] = useState([]);
  useEffect(() => {
    if (transactions) setShowData(transactions.slice(0, 10));
  }, [transactions]);
  // Paginaton handel
  const handleClick = (page: any) => {
    setCurrentPage(page);
    const pageIndex = page - 1;
    const firstIndex = pageIndex * 10;
    const lastIndex = pageIndex * 10 + 10;
    setShowData(transactions.slice(firstIndex, lastIndex));
  };
  // Load transactions
  useEffect(() => {
    const getData = async () => {
      const res = await loadData(url);
      const { data } = res;
      settransactions(data.data);
      setFetching(false);
    };
    getData();
  }, []);
  const getTransactionOnClick = async (
    // cardID: any,
    transactionID: any,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    const url = ` http://localhost:9090/transactions/${transactionID}`;
    const data = await loadData(url);
    navigate("../viewTransaction", {
      state: {
        transaction: data.data.transaction,
        card: data.data.transaction.card,
      },
    });
  };

  if (fetching) return <ReactLoading type="bubbles" color="#000000" />;
  return (
    <>
      <Button
        variant="outline-info"
        className="m-2"
        onClick={() => setFilter(!filter)}
      >
        Filter
      </Button>
      {filter ? (
        <TransactionFilter
          setFilterQuery={(query: any) => setFilterQuery(query)}
        />
      ) : null}
      {showData ? (
        <TransactionTable
          data={showData}
          getTransaction={getTransactionOnClick}
        />
      ) : null}
      <CustomPagination
        dataPerPage={10}
        totalData={transactions.length}
        paginate={handleClick}
      />
    </>
  );
};

export default Transactions;
