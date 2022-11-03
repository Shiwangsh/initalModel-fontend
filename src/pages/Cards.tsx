import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Search from "../components/Search/Search";

import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import authHeader from "../services/auth-header";
import CustomPagination from "../components/Pagination";

const AllCards = () => {
  const [cards, setcards] = useState([]);
  const [currentCard, setCurrentCard] = useState<any>();
  const [user, setUser] = useState();
  const [fetching, setFetching] = useState(true);
  // const [openEdit, setOpenEdit] = useState<any>(false);
  const [search, setSearch] = useState(" ");
  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsToShow, setShowCards] = useState([]);
  useEffect(() => {
    if (cards) setShowCards(cards.slice(0, 15));
  }, [cards]);

  const paginate = (page: any) => {
    setCurrentPage(page);
    const pageIndex = page - 1;
    const firstIndex = pageIndex * 15;
    const lastIndex = pageIndex * 15 + 15;
    setShowCards(cards.slice(firstIndex, lastIndex));
  };

  // Get Cards
  useEffect(() => {
    const getcards = async () => {
      const url = `http://localhost:9090/cards?search=${search}`;
      const res = await axios.get(url);
      const { data } = res;
      setcards(data.cards);
      setFetching(false);
    };
    getcards();
  }, [search]);

  // Navigate to user profile
  useEffect(() => {
    if (user)
      navigate("../userProfile", {
        state: { user: user },
      });
  }, [navigate, user]);

  useEffect((): any => {
    if (currentCard) {
      console.log(currentCard);
      navigate("../viewCard", {
        state: { card: currentCard },
      });
    }
  }, [currentCard, navigate]);

  // Get User
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
    console.log(data.user);
    setUser(data.user);
  };

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
      <div className="m-2">
        {/* <Link to="../loadBalance">Load Balance</Link> */}
      </div>
      <div className="m-2">
        <Table striped bordered responsive>
          <thead className="thead-dark">
            <tr>
              <th>UUID</th>
              <th>Balance</th>
              <th>Card Type</th>
              {/* <th>User</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cardsToShow.map((card, index) => {
              return (
                <tr key={index}>
                  <td>
                    <small>{card["uuid"]}</small>
                  </td>
                  <td>{card["balance"]}</td>
                  <td>{card["cardType"]}</td>
                  {/* <td>
                    <Button
                      variant="outline-dark"
                      onClick={(e) => getUserOnClick(card["user"], e)}
                    >
                      {card["user"]}
                    </Button>
                  </td> */}
                  <td>
                    <Button variant="none" onClick={() => setCurrentCard(card)}>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="pl-1"
                        color="#0b7312"
                      />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <CustomPagination
          dataPerPage={15}
          totalData={cards.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default AllCards;
