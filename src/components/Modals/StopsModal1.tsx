import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const StopsModal = ({ data, stateChanger, showModal }: any) => {
  console.log(data);
  return (
    <>
      <div className="card" style={{ width: "10rem", marginLeft: "20px" }}>
        <ul className="list-group list-group-flush">
          {data.map((stop: any) => {
            return (
              <li
                className="list-group-item"
                onClick={() => {
                  console.log(stop.name);
                  stateChanger(stop.name);
                  showModal(false);
                }}
              >
                {stop.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default StopsModal;
