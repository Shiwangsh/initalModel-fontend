import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Search from "../../components/Search/Search";
import CustomPagination from "../../components/Pagination";
import FilterUser from "../../components/User/FilterUser";
import { Button } from "react-bootstrap";
import filterResults from "../../services/filter-results";
import loadData from "../../services/load-data";
import UserTable from "../../components/User/UserTable";

const AllUsers = () => {
  const url = "http://localhost:9090/users";
  const [search, setSearch] = useState(" ");
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);

  //Filter
  const [filter, setFilter] = useState(false);
  const [filterQuery, setFilterQuery] = useState<any>("");
  useEffect(() => {
    if (filterQuery) {
      const getUsers = async () => {
        const data = await filterResults(url, filterQuery);
        setUsers(data.users);
        setFetching(false);
      };
      getUsers();
    }
  }, [filterQuery]);

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

  // Load Users
  useEffect(() => {
    const getUsers = async () => {
      const data = await loadData(`${url}?search=${search}`);
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
      <Link to="../createUser" className="p-2" style={{ color: "#32a3ad" }}>
        Add user
      </Link>
      <br />
      <Button variant="outline-info" onClick={() => setFilter(!filter)}>
        Filter
      </Button>
      {filter ? (
        <FilterUser setFilterQuery={(query: any) => setFilterQuery(query)} />
      ) : null}
      {usersToShow ? <UserTable users={usersToShow} /> : null}

      <CustomPagination
        dataPerPage={10}
        totalData={users.length}
        paginate={paginate}
      />
    </>
  );
};

export default AllUsers;
