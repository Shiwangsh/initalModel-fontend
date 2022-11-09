import React from "react";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Search from "../../components/Search/Search";
import CustomPagination from "../../components/Pagination";
import FilterUser from "../../components/User/FilterUser";
import { Button } from "react-bootstrap";
import filterResults from "../../services/filter-results";
import loadData from "../../services/load-data";
import StaffTable from "../../components/Staff/StaffTable";

const Staffs = () => {
  const url = "http://localhost:9090/staffs";
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
        setUsers(data.staffs);
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
      setUsers(data.staffs);
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
      <Button
        variant="outline-info"
        className="m-2"
        onClick={() => setFilter(!filter)}
      >
        Filter
      </Button>
      {filter ? (
        <FilterUser
          userModal="staff"
          setFilterQuery={(query: any) => setFilterQuery(query)}
        />
      ) : null}
      {usersToShow ? <StaffTable users={usersToShow} /> : null}

      <CustomPagination
        dataPerPage={10}
        totalData={users.length}
        paginate={paginate}
      />
    </>
  );
};

export default Staffs;
