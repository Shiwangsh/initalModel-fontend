import {
  faEye,
  faMoneyBill1Wave,
  faTrainSubway,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Table } from "react-bootstrap";

const TransactionTable = ({ data, getTransaction }: any) => {
  return (
    <div className="m-2">
      <Table striped bordered hover responsive size="sm">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Type</th>
            <th>Date and Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction: any, index: any) => {
            return (
              <tr key={index}>
                <td>
                  <small>{transaction["_id"]}</small>
                </td>
                {transaction["status"] === "Open" ? (
                  <td>
                    <span className="badge badge-pill badge-success">
                      {transaction["status"]}
                    </span>
                  </td>
                ) : (
                  <td>
                    <span className="badge badge-pill badge-danger">
                      {transaction["status"]}
                    </span>
                  </td>
                )}
                {transaction["type"] === "Ticket" ? (
                  <td>
                    <span className="badge badge-">
                      <FontAwesomeIcon
                        icon={faTrainSubway}
                        className="pl-2"
                        color="#b33059"
                        size="lg"
                      />
                    </span>
                  </td>
                ) : (
                  <td>
                    <FontAwesomeIcon
                      icon={faMoneyBill1Wave}
                      className="pl-2"
                      color="#32a852"
                      size="lg"
                    />
                  </td>
                )}
                <td>
                  {transaction["createdAt"].substring(0, 10)} ,{" "}
                  {transaction["createdAt"].substring(11, 18)}{" "}
                </td>
                <td>
                  <Button
                    variant="none"
                    onClick={(e) =>
                      getTransaction(transaction["card"], transaction, e)
                    }
                  >
                    <FontAwesomeIcon icon={faEye} color="#0b7312" />
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

export default TransactionTable;
