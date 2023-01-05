import React from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./stopStyles.css";

const ShowSingleRouteStops = ({ stops, userRouteName, userFair }: any) => {
  return (
    <>
      <div className="d-flex flex-row flex-wrap">
        <Card
          bg="dark"
          style={{ color: "#dbe8ff", width: "400px", margin: "10px" }}
        >
          <Card.Body>
            <p style={{ color: "#30D5C8", fontSize: "20px" }}>
              {userRouteName}
            </p>
            <p style={{ color: "#30D5C8", fontSize: "20px" }}>Rs. {userFair}</p>

            <p>Arrival Time: 20 mins</p>
            <p>Number of stops: {stops.length}</p>

            {stops.map((stop: any, index: any) => {
              return (
                <div
                  className="d-flex flex-row flex-wrap"
                  style={{ margin: "0px" }}
                >
                  <div
                    style={{
                      borderRight: "6px solid",
                      borderRadius: "5px",
                      marginRight: "10px",
                      color: "#30D5C8",
                    }}
                  ></div>

                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ marginRight: "15px" }}
                    color="#30D5C8"
                    size="lg"
                  />
                  <p>{stop["name"]}</p>
                </div>
              );
            })}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ShowSingleRouteStops;
