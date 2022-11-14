import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Table } from "react-bootstrap";

const CardTable = ({ data, setCurrentCard }: any) => {
  return (
    <div className="m-2">
      <Table striped bordered responsive>
        <thead className="thead-dark">
          <tr>
            <th>UUID</th>
            <th>Balance</th>
            <th>Card Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((card: any, index: any) => {
            return (
              <tr key={index}>
                <td>
                  <small>{card["uuid"]}</small>
                </td>
                <td>{card["balance"].toFixed(2)}</td>
                <td>{card["cardType"]}</td>
                <td>
                  <Button variant="none" onClick={() => setCurrentCard(card)}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="pl-1"
                      color="#0b7312"
                    />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CardTable;
