import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactLoading from "react-loading";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Search from "../../components/Search/Search";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditBus from "../../components/Bus/EditBus";
import CustomPagination from "../../components/Pagination";
import filterResults from "../../services/filter-results";
import BusFilter from "../../components/Bus/FilterBus";
import loadData from "../../services/load-data";

const AllCards = () => {
  const [buses, setBuses] = useState<any>();
  const [route, setRoute] = useState();
  const [search, setSearch] = useState<any>(" ");
  const [open, setOpen] = useState<any>(false);

  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const [bus, setBus] = useState();

  //Filter
  const [filter, setFilter] = useState(false);
  const [filterQuery, setFilterQuery] = useState<any>("");
  useEffect(() => {
    if (filterQuery) {
      const getBuses = async () => {
        const data = await filterResults(
          "http://localhost:9090/buses",
          filterQuery
        );
        setBuses(data.buses);
        setFetching(false);
      };
      getBuses();
    }
  }, [filterQuery]);

  // Paginaton handel
  const [currentPage, setCurrentPage] = useState(1);
  const [showData, setShowData] = useState([]);
  useEffect(() => {
    if (buses) setShowData(buses.slice(0, 10));
  }, [buses]);
  const handleClick = (page: any) => {
    setCurrentPage(page);
    const pageIndex = page - 1;
    const firstIndex = pageIndex * 10;
    const lastIndex = pageIndex * 10 + 10;
    setShowData(buses.slice(firstIndex, lastIndex));
  };

  useEffect(() => {
    const getBuses = async () => {
      const res = await loadData(`http://localhost:9090/buses`);
      setBuses(res.buses);
      setFetching(false);
    };
    getBuses();
  }, [search]);

  useEffect((): any => {
    if (route) {
      navigate("../viewRoute", {
        state: { route },
      });
    }
  }, [route, navigate]);

  const getRouteOnClick = async (
    route: any,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    // const url = ` http://localhost:9090/routes/${routeID}`;
    // const res = await axios.get(url);
    // const { data } = res;
    setRoute(route);
  };

  const editBus = (bus: any, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setBus(bus);
    setOpen(true);
  };

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
      {open ? <EditBus bus={bus} closePopup={() => setOpen(false)} /> : null}
      {/* <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter regNum to search"
      /> */}
      <Button
        variant="outline-info"
        className="m-2"
        onClick={() => setFilter(!filter)}
      >
        Filter
      </Button>
      {filter ? (
        <BusFilter setFilterQuery={(query: any) => setFilterQuery(query)} />
      ) : null}
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Registration Number</th>
            <th>Capacity</th>
            <th>Route</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {showData.map((bus, index) => {
            return (
              <tr key={index}>
                <td>{bus["_id"]}</td>
                <td>{bus["regNum"]}</td>
                <td>{bus["capacity"]}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={(e) => getRouteOnClick(bus["route"], e)}
                  >
                    {bus["route"]["routeName"]}
                  </Button>
                </td>
                <td>
                  <Button variant="none" onClick={(e) => editBus(bus, e)}>
                    <FontAwesomeIcon icon={faEdit} color="#0b7312" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CustomPagination
        dataPerPage={10}
        totalData={showData.length}
        paginate={handleClick}
      />
    </>
  );
};

export default AllCards;
