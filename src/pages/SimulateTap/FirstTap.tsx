import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ErrorModal from "../../components/ErrorModal";
import SucessModal from "../../components/SucessModal";

const FirstTap = () => {
  const [cardID, setCardID] = useState<any>();
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = `http://localhost:9090/cards/firstTap`;
    await axios
      .post(url, {
        cardID: cardID,
      })
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((error) => {
        if (error.response) {
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
      {success ? (
        <SucessModal
          text="Travel start🚌👌"
          closePopup={() => setSuccess(false)}
        />
      ) : null}
      <div className="card m-4 border border-info">
        <h5 className="card-header">First Tap</h5>
        <div className="card-body">
          <h3 className="mb-2">Initail Tap</h3>
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Card UUID</p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control rounded-left w-50"
                name="UUID"
                onChange={(e) => setCardID(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <Button type="submit" className="btn btn-success" variant="info">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FirstTap;
