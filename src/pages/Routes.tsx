import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Search from "../components/Search/Search";

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

  //   const getUserOnClick = async (
  //     userID: any,
  //     e: React.MouseEvent<HTMLElement>
  //   ) => {
  //     e.preventDefault();
  //     const url = ` http://localhost:9090/users/${userID}`;
  //     const res = await axios.get(url);
  //     const { data } = res;
  //     console.log(data.user);
  //     setUser(data.user);

  //     // navigate("../userProfile", {
  //     //   state: { user: user },
  //     // });
  //   };

  if (fetching) return <ReactLoading type="bubbles" color="#000000" />;
  return (
    <>
      <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter name to search"
      />
      <Link to="../createRoute">Add Route</Link>
      <div className="m-2">
        <Table striped borderless hover responsive>
          <thead>
            <tr>
              <th>Route Name</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((obj, index) => {
              return (
                <tr key={index}>
                  <td>
                    {obj["routeName"]}
                    <br />
                    <Button onClick={(e) => getRouteOnClick(obj["_id"], e)}>
                      {obj["_id"]}
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
