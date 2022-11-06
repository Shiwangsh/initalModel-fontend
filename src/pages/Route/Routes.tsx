import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Search from "../../components/Search/Search";

import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AllRoute = () => {
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState();

  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState(" ");
  const navigate = useNavigate();
  // const mountedRef = useMountedRef();

  useEffect(() => {
    const getRoute = async () => {
      const url = `http://localhost:9090/routes?search=${search}`;
      const res = await axios.get(url);
      const { data } = res;
      setRoutes(data.routes);
      console.log(data.routes);
      setFetching(false);
    };
    getRoute();
  }, [search]);

  useEffect(() => {
    if (route)
      navigate("../viewRoute", {
        state: { route: route },
      });
  }, [navigate, route]);

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

  if (fetching) return <ReactLoading type="bubbles" color="#000000" />;
  return (
    <>
      <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter name to search"
      />
      <Link to="../createRoute">Add Route</Link>
      <div className="m-2">
        <Table striped bordered hover responsive className="w-75 mx-auto">
          <thead className="thead-dark text-center">
            <tr>
              <th>Routes</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((obj, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>
                    {obj["routeName"]}
                    <br />
                    <Button
                      variant="outline-info"
                      onClick={(e) => getRouteOnClick(obj["_id"], e)}
                    >
                      View Route details
                    </Button>
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

export default AllRoute;
