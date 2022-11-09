import React from "react";
import { useEffect, useState } from "react";
import Search from "../../components/Search/Search";

import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CustomPagination from "../../components/Pagination";
import loadData from "../../services/load-data";
import filterResults from "../../services/filter-results";
import CardFilter from "../../components/Card/CardFilter";
import CardTable from "../../components/Card/CardTable";

const AllCards = () => {
  const url = "http://localhost:9090/cards";
  const [cards, setcards] = useState([]);
  const [currentCard, setCurrentCard] = useState<any>();
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState(" ");
  const navigate = useNavigate();

  //Filter
  const [filter, setFilter] = useState(false);
  const [filterQuery, setFilterQuery] = useState<any>("");
  useEffect(() => {
    if (filterQuery) {
      const getData = async () => {
        const data = await filterResults(url, filterQuery);
        setcards(data.cards);
        setFetching(false);
      };
      getData();
    }
  }, [filterQuery]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [showData, setShowData] = useState([]);
  useEffect(() => {
    if (cards) setShowData(cards.slice(0, 15));
  }, [cards]);
  const paginate = (page: any) => {
    setCurrentPage(page);
    const pageIndex = page - 1;
    const firstIndex = pageIndex * 15;
    const lastIndex = pageIndex * 15 + 15;
    setShowData(cards.slice(firstIndex, lastIndex));
  };

  // Get Cards
  useEffect(() => {
    const getData = async () => {
      const data = await loadData(`${url}?search=${search}`);
      setcards(data.cards);
      setFetching(false);
    };
    getData();
  }, [search]);

  useEffect((): any => {
    if (currentCard) {
      console.log(currentCard);
      navigate("../viewCard", {
        state: { card: currentCard },
      });
    }
  }, [currentCard, navigate]);

  if (fetching)
    return (
      <ReactLoading
        type="bubbles"
        color="#000000"
        className="container align-items-center"
      />
    );
  return (
    <>
      <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter ID to search"
      />
      <Button
        variant="outline-info"
        className="m-2"
        onClick={() => setFilter(!filter)}
      >
        Filter
      </Button>
      {filter ? (
        <CardFilter setFilterQuery={(query: any) => setFilterQuery(query)} />
      ) : null}
      {showData ? (
        <CardTable data={showData} setCurrentCard={setCurrentCard} />
      ) : null}
      <CustomPagination
        dataPerPage={15}
        totalData={cards.length}
        paginate={paginate}
      />
    </>
  );
};

export default AllCards;
