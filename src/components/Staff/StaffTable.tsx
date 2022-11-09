import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const StaffTable = ({ users }: any) => {
  console.log(users);
  return (
    <div className="m-2">
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Staff Type</th>
            <th>Address</th>
            <th>Contact Number</th>
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
                <td>{user["staffType"]}</td>
                <td>{user["address"]}</td>
                <td>{user["contactNumber"]}</td>
                <td>
                  <Link to="../userProfile" state={{ user: user }}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="pl-1"
                      color="#0b7312"
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default StaffTable;
