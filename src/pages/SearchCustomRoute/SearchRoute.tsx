import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import SingleRouteMap from "../../components/CustomRoute/SingleRouteMap";
import DoubleRouteMap from "../../components/CustomRoute/DoubleRouteMap";

const SearchRoute = () => {
  const [startStop, setStartStop] = useState("");
  const [endStop, setEndStop] = useState("");

  const [result, setResult] = useState<any>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setResult("");
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
          console.log(error.response);
        } else {
          console.log("Error", error);
        }
      });
  };

  return (
    <div>
      SearchRoute
      <form className="form-inline p-3" onSubmit={(e: any) => handleSubmit(e)}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Start Stop"
          onChange={(e) => setStartStop(e.target.value)}
        />

        <input
          type="text"
          className="form-control ml-3"
          placeholder="Enter End Stop"
          onChange={(e) => setEndStop(e.target.value)}
        />
        <Button variant="outline-info" className="m-2" type="submit">
          Search
        </Button>
      </form>
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
