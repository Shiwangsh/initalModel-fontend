import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import AuthHeader from "../services/auth-header";
// import { Button } from "react-bootstrap";

import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Search from "../components/Search/Search";

const AllUsers = () => {
  const [search, setSearch] = useState(" ");
  const [user, setUser] = useState(" ");

  const [users, setUsers] = useState([]);

  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      const url = `
        http://localhost:9090/users?search=${search}
      `;
      const res = await axios.get(url, {
        headers: AuthHeader(),
      });
      const { data } = res;
      setUsers(data.users);
      setFetching(false);
    };
    getUsers();
  }, [search]);

  if (fetching) return <ReactLoading type="spinningBubbles" color="#000000" />;

  return (
    <>
      <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter name to search"
      />
      <Link to="../createUser" className="p-2">
        Add user
      </Link>
      <div className="m-2">
        <Table striped borderless hover responsive>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Address</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    <small>{user["_id"]}</small>
                  </td>
                  <td>{user["name"]}</td>
                  <td>{user["email"]}</td>
                  <td>{user["userType"]}</td>
                  <td>{user["address"]}</td>
                  <td>{user["contactNumber"]}</td>
                  <td>
                    <Link to="../userProfile" state={{ user: user }}>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="pl-1"
                        color="green"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AllUsers;
