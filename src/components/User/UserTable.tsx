import {
  faEye,
  faPenToSquare,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const UserTable = ({ users }: any) => {
  const navigate = useNavigate();
  const toggleActive = async (userID: any) => {
    await axios
      .patch(`http://localhost:9090/users/${userID}/active`)
      .then((res) => {
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="m-2">
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Card Type</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any, index: any) => {
            return (
              <tr key={index}>
                <td>
                  <small>{user["_id"]}</small>
                </td>
                <td>{user["name"]}</td>
                <td>{user["email"]}</td>
                <td>{user["cardType"]}</td>
                <td>{user["address"]}</td>
                <td>{user["contactNumber"]}</td>
                {user["active"] === true ? (
                  <td>
                    <span className="badge badge-pill badge-success">
                      active
                    </span>
                  </td>
                ) : (
                  <td>
                    <span className="badge badge-pill badge-danger">
                      inactive
                    </span>
                  </td>
                )}

                <td>
                  <Link to="../userProfile" state={{ user: user }}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="pl-1"
                      color="#0b7312"
                    />
                  </Link>
                  {user["active"] === true ? (
                    <FontAwesomeIcon
                      icon={faToggleOn}
                      className="ml-3"
                      size="lg"
                      style={{ color: "#38b297" }}
                      onClick={() => toggleActive(user["_id"])}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faToggleOff}
                      size="lg"
                      className="ml-3"
                      style={{ color: "#38b297" }}
                      onClick={() => toggleActive(user["_id"])}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
