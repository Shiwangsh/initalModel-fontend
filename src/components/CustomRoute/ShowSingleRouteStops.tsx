import React from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./stopStyles.css";

const ShowSingleRouteStops = ({ stops }: any) => {
  return (
    <div className="d-flex flex-row flex-wrap">
      {stops.map((stop: any, index: any) => {
        return (
          <Card
            key={index}
            bg="dark"
            style={{ color: "#dbe8ff", width: "200px", margin: "10px" }}
          >
            <Card.Body>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="float-right mr-5"
                color="#30D5C8"
                size="lg"
              />
              <p>{stop["name"]}</p>
              {/* <p>Distance:{stop["distance"]}</p>
              <p>Stop ID:{stop["_id"]}</p> */}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default ShowSingleRouteStops;
