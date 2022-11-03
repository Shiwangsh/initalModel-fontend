import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import AuthHeader from "../services/auth-header";

import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Search from "../components/Search/Search";
// import Pagination from "react-bootstrap/Pagination";
import CustomPagination from "../components/Pagination";

const AllUsers = () => {
  const [search, setSearch] = useState(" ");
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersToShow, setShowUser] = useState([]);
  useEffect(() => {
    if (users) setShowUser(users.slice(0, 10));
  }, [users]);

  const paginate = (page: any) => {
    setCurrentPage(page);
    const pageIndex = page - 1;
    const firstIndex = pageIndex * 10;
    const lastIndex = pageIndex * 10 + 10;
    setShowUser(users.slice(firstIndex, lastIndex));
  };
  //

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

  if (fetching)
    return (
      <ReactLoading
        type="bubbles"
        color="#000000"
        className="container align-items-center"
      />
    );

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
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {usersToShow.map((user, index) => {
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
                        color="#0b7312"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <CustomPagination
          dataPerPage={10}
          totalData={users.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default AllUsers;
