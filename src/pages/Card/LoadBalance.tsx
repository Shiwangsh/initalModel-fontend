import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import authHeader from "../../services/auth-header";
import EditBalance from "../../components/Card/EditBalance";
import ErrorModal from "../../components/Modals/ErrorModal";

const LoadBalance = () => {
  const [cardID, setCardID] = useState<any>();
  const [error, setError] = useState<any>();

  const [card, setCard] = useState();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = `http://localhost:9090/cards/${cardID}`;
    await axios
      .get(url, { headers: authHeader() })
      .then((res) => {
        setCard(res.data.card);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setError(error.response.data.message);
        } else {
          console.log("Error", error);
        }
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : null}
      <div className="card m-4 mt-20">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Card UUID</p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control rounded-left w-100"
                name="UUID"
                onChange={(e) => setCardID(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <Button variant="outline-info" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      {card ? <EditBalance card={card} /> : null}
    </form>
  );
};

export default LoadBalance;
