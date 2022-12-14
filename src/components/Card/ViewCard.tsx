import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import ErrorModal from "../Modals/ErrorModal";
import loadData from "../../services/load-data";
import TransactionTable from "../Transaction/TransactionTable";
import CustomPagination from "../Pagination";

const ViewCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location STATE->>>", location.state);
  const [card, setCard] = useState(location.state.card);
  const [cardUser, setCardUser] = useState();
  const [transactions, setTransactions] = useState<any>();
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    const getTransactions = async () => {
      const res = await loadData(
        `http://localhost:9090/cards/${card.uuid}/transactions`
      );
      setTransactions(res.data.data);
      setFetching(false);
    };
    getTransactions();
  }, [card.uuid, location.state]);

  console.log(transactions);

  const getUserOnClick = async (
    userID: any,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    const url = ` http://localhost:9090/users/${userID}`;
    const res = await loadData(url);
    console.log(res.data.data);
    setCardUser(res.data.data);
    if (!res.data.data) setError(true);
  };

  useEffect(() => {
    if (cardUser)
      navigate("../userProfile", {
        state: { user: cardUser },
      });
  }, [navigate, cardUser, error]);

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

  if (fetching)
    return (
      <ReactLoading
        type="spinningBubbles"
        color="#000000"
        className="container align-items-center"
      />
    );
  console.log(card.user.active);

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
                  <Link to="../../dashboard" style={{ color: "#23abc0" }}>
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="../cards" style={{ color: "#23abc0" }}>
                    Cards
                  </Link>
                </li>

                <li
                  className="breadcrumb-item active font-weight-bold"
                  aria-current="page"
                >
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
              <small>
                <p className="text-muted mb-0">{card.uuid}</p>
              </small>
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
                View User
                {/* {card.user} */}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-body">
        <h3>Transactions</h3>
        <TransactionTable
          data={showData}
          getTransaction={getTransactionOnClick}
        />
        <CustomPagination
          dataPerPage={10}
          totalData={transactions.length}
          paginate={handleClick}
        />
      </div>
    </section>
  );
};

export default ViewCard;

/**
 *
 *
 *
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
