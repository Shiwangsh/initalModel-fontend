import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ErrorModal from "../../components/Modals/ErrorModal";
import SucessModal from "../../components/Modals/SucessModal";

const SimulateTapRevised = () => {
  const [cardID, setCardID] = useState<any>();
  const [busID, setBusID] = useState<any>();
  const [firstStop, setFirstStop] = useState<any>();
  const [lastStop, setLastStop] = useState<any>();

  const [error, setError] = useState<any>();
  const [initialSuccess, setInitialSuccess] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = `http://localhost:9090/cards/tap`;
    await axios
      .post(url, {
        cardID: cardID,
        busID: busID,
      })
      .then((res) => {
        setInitialSuccess(true);
        setSuccess(true);
        setSuccessMessage(res.data.status);
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
          text={successMessage}
          closePopup={() => setSuccess(false)}
        />
      ) : null}
      <div className="card m-4 border border-info">
        <h5 className="card-header">Card Tap</h5>
        <div className="card-body">
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
          <div className="row mt-3">
            <div className="col-sm-3">
              <p className="mb-0">Bus ID</p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control rounded-left w-50"
                name="UUID"
                onChange={(e) => setBusID(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-3">
              <p className="mb-0">First Stop</p>
            </div>
            <div className="col-sm-9">
              <input
                className="form-control rounded-left w-25"
                name="UUID"
                onChange={(e) => setFirstStop(e.target.value)}
              />
            </div>
          </div>

          {initialSuccess ? (
            <div className="row mt-3">
              <div className="col-sm-3">
                <p className="mb-0">Last Stop</p>
              </div>
              <div className="col-sm-9">
                <input
                  className="form-control rounded-left w-25"
                  name="UUID"
                  onChange={(e) => setLastStop(e.target.value)}
                />
              </div>
            </div>
          ) : null}

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

export default SimulateTapRevised;
