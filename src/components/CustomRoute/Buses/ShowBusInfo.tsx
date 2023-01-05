import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Card from "react-bootstrap/Card";

const ShowBusInfo = ({ bus }: any) => {
  return (
    <Card
      bg="dark"
      style={{ color: "#dbe8ff", width: "200px", marginTop: "150px" }}
    >
      <Card.Body>
        <FontAwesomeIcon
          icon={faBusSimple}
          //   className="float-right"
          color="#30D5C8"
          size="lg"
        />
        <p>
          RegNum:
          <br /> {bus.regNum}
        </p>
        <p>Arrival Time: 20 mins</p>

        {/* <p>Latitude:{bus.latitude.toFixed(2)}</p>
        <p>Longitude:{bus.longitude.toFixed(2)}</p> */}
      </Card.Body>
    </Card>
  );
};

export default ShowBusInfo;
