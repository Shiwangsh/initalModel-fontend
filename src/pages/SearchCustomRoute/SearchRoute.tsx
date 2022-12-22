import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import SingleRouteMap from "../../components/CustomRoute/SingleRouteMap";
import DoubleRouteMap from "../../components/CustomRoute/DoubleRouteMap";
import loadData from "../../services/load-data";
import StopsModal1 from "../../components/Modals/StopsModal1";
import StopsModal2 from "../../components/Modals/StopModal2";
import ErrorModal from "../../components/Modals/ErrorModal";
const SearchRoute = () => {
  const [startStop, setStartStop] = useState<any>();
  const [endStop, setEndStop] = useState<any>();
  const [stops, setStops] = useState<any>();
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [error, setError] = useState<any>();

  const [result, setResult] = useState<any>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setResult("");
    console.log(startStop, endStop);
    setShowModal1(false);
    setShowModal2(false);
    await axios
      .post("http://localhost:9090/smartRoute", {
        startStop: startStop,
        endStop: endStop,
      })
      .then((res) => {
        setResult(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
          setError(error.response.data.message);
        } else {
          console.log("Error", error);
        }
      });
  };

  const showSearchResults1 = async (stopName: any) => {
    if (stopName !== "") {
      const data = await loadData(
        `http://localhost:9090/stops/search?search=${stopName}`
      );
      setStops(data.stops);
      setShowModal1(true);
    } else {
      setStops("");
      setShowModal1(false);
    }
  };
  const showSearchResults2 = async (stopName: any) => {
    if (stopName !== "") {
      const data = await loadData(
        `http://localhost:9090/stops/search?search=${stopName}`
      );
      setStops(data.stops);
      setShowModal2(true);
    } else {
      setStops("");
      setShowModal2(false);
    }
  };

  const clear = () => {
    setStartStop("");
    setEndStop("");
    setStops("");
    setResult("");
  };

  return (
    <div>
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : null}
      SearchRoute
      <form className="form-inline p-3" onSubmit={(e: any) => handleSubmit(e)}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Start Stop"
          id="startStop"
          value={startStop}
          onChange={(e) => {
            showSearchResults1(e.target.value);
            setStartStop(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control ml-3"
          placeholder="Enter End Stop"
          id="endStop"
          value={endStop}
          onChange={(e) => {
            showSearchResults2(e.target.value);
            setEndStop(e.target.value);
          }}
        />

        <Button variant="outline-info" className="m-2" type="submit">
          Search
        </Button>
        <Button
          variant="outline-danger"
          className="m-2"
          onClick={() => clear()}
        >
          Clear
        </Button>
      </form>
      <div className="d-flex">
        {stops && showModal1 ? (
          <StopsModal1
            data={stops}
            stateChanger={setStartStop}
            showModal={setShowModal1}
          />
        ) : null}
        {stops && showModal2 ? (
          <StopsModal2
            data={stops}
            stateChanger={setEndStop}
            showModal={setShowModal2}
          />
        ) : null}
      </div>
      {result && result["result"] === 1 ? (
        <SingleRouteMap data={result} />
      ) : null}
      {result && result["result"] === 2 ? (
        <DoubleRouteMap data={result} />
      ) : null}
    </div>
  );
};

export default SearchRoute;
