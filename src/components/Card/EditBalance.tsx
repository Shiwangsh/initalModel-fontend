import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";
import ErrorModal from "../Modals/ErrorModal";
import SucessModal from "../Modals/SucessModal";

const EditBalance = ({ card }: any) => {
  const navigate = useNavigate();

  const [newBalance, setNewBalance] = useState<any>();
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(card);
    const url = `http://localhost:9090/cards/loadBalance`;
    await axios
      .post(
        url,
        {
          cardID: card.uuid,
          balance: +newBalance,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        console.log(res);

        setSuccess(true);
        setTimeout(() => navigate(0), 1000);
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
    <div className="card m-4">
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : null}
      {success ? (
        <SucessModal
          text="Funds Sucessfully loaded"
          closePopup={() => setSuccess(false)}
        />
      ) : null}
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Current Balance</p>
          </div>
          <div className="col-sm-9">
            <p className="form-control  w-25">{card.balance}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">New Balance</p>
          </div>
          <div className="col-sm-9">
            <input
              className="form-control rounded-left w-25"
              name="balance"
              onChange={(e) => setNewBalance(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <Button type="submit" variant="outline-info" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBalance;
