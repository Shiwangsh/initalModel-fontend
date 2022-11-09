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

const AllCards = () => {
  const [buses, setBuses] = useState([]);
  const [route, setRoute] = useState();
  const [search, setSearch] = useState<any>(" ");
  const [open, setOpen] = useState<any>(false);

  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  // const [edit, setEdit] = useState(false);
  const [bus, setBus] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [showData, setShowData] = useState([]);
  useEffect(() => {
    if (buses) setShowData(buses.slice(0, 10));
  }, [buses]);
  // Paginaton handel
  const handleClick = (page: any) => {
    setCurrentPage(page);
    const pageIndex = page - 1;
    const firstIndex = pageIndex * 10;
    const lastIndex = pageIndex * 10 + 10;
    setShowData(buses.slice(firstIndex, lastIndex));
  };

  useEffect(() => {
    const getBuses = async () => {
      const res = await axios.get(
        `http://localhost:9090/buses?search=${search}`
      );
      const { data } = res;
      setBuses(data.buses);
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
    routeID: any,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    const url = ` http://localhost:9090/routes/${routeID}`;
    const res = await axios.get(url);
    const { data } = res;
    setRoute(data.route);
  };

  const editBus = (bus: any, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setBus(bus);
    setOpen(true);
  };

  if (fetching) return <ReactLoading type="balls" color="#000000" />;
  return (
    <>
      {open ? <EditBus bus={bus} closePopup={() => setOpen(false)} /> : null}
      <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter regNum to search"
      />
      <Link to="../createBus" className="p-2">
        Add Bus
      </Link>

      <Table striped bordered hover responsive>
        {/* {showData.length === 0 ? <p className="text-muted">No buses</p> : null} */}
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
          {buses.map((bus, index) => {
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
                    {bus["route"]}
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
        totalData={buses.length}
        paginate={handleClick}
      />
    </>
  );
};

export default AllCards;
