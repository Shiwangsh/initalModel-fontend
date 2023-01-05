import React from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
const ShowDoubleRouteStops = ({ stops, userRouteName, userFair }: any) => {
  console.log("HERE>>>", userFair);
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
            <p>Total Number of stops: {stops[0].length + stops[1].length}</p>

            {stops[0].map((stop: any, index: any) => {
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
            <FontAwesomeIcon
              style={{ margin: "0px" }}
              icon={faEllipsisVertical}
              size="2x"
            />
            <p>Switch Bus here</p>
            <FontAwesomeIcon
              style={{ margin: "0px" }}
              icon={faEllipsisVertical}
              size="2x"
            />
            {stops[1].map((stop: any, index: any) => {
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
                      color: "#8740f0",
                    }}
                  ></div>

                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ marginRight: "15px" }}
                    color="#8740f0"
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

export default ShowDoubleRouteStops;

//  <div className="d-flex flex-row flex-wrap">
//    {stops[0].map((stop: any, index: any) => {
//      return (
//        <Card
//          key={index}
//          bg="dark"
//          style={{ color: "#dbe8ff", width: "200px", margin: "10px" }}
//        >
//          <Card.Body>
//            <FontAwesomeIcon
//              icon={faLocationDot}
//              className="float-right mr-5"
//              color="#30D5C8"
//              size="lg"
//            />
//            <p>{stop["name"]}</p>
//            {/* <p>Distance:{stop["distance"]}</p>
//           <p>Stop ID:{stop["_id"]}</p> */}
//          </Card.Body>
//        </Card>
//      );
//    })}
//    SWITCH BUS RIGHT HERE😎😎😥👌🚌🪦‼️❗💀
//    <div className="d-flex flex-row flex-wrap">
//      {stops[1].map((stop: any, index: any) => {
//        return (
//          <Card
//            key={index}
//            bg="dark"
//            style={{ color: "#dbe8ff", width: "200px", margin: "10px" }}
//          >
//            <Card.Body>
//              <FontAwesomeIcon
//                icon={faLocationDot}
//                className="float-right mr-5"
//                color="#8740f0"
//                size="lg"
//              />
//              <p>{stop["name"]}</p>
//              {/* <p>Distance:{stop["distance"]}</p>
//           <p>Stop ID:{stop["_id"]}</p> */}
//            </Card.Body>
//          </Card>
//        );
//      })}
//    </div>
//  </div>;
