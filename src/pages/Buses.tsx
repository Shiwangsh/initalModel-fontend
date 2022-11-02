import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactLoading from "react-loading";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Search from "../components/Search/Search";

const AllCards = () => {
  const [buses, setBuses] = useState([]);
  const [route, setRoute] = useState();
  const [search, setSearch] = useState<any>(" ");

  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

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

  if (fetching) return <ReactLoading type="balls" color="#000000" />;
  return (
    <>
      <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter regNum to search"
      />
      <Link to="../createBus" className="p-2">
        Add Bus
      </Link>

      <Table striped borderless hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Registration Number</th>
            <th>Capacity</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          {/* {JSON.stringify(users)} */}
          {buses.map((bus, index) => {
            return (
              <tr key={index}>
                <td>{bus["_id"]}</td>
                <td>{bus["regNum"]}</td>
                <td>{bus["capacity"]}</td>
                <td>
                  <Button onClick={(e) => getRouteOnClick(bus["route"], e)}>
                    {bus["route"]}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
    // <>
    //   <div> {JSON.stringify(cards)}</div>
    //   {cards.map((bus) => {
    //     return <h3>{bus["name"]}</h3>;
    //   })}
    // </>
  );
};

export default AllCards;
