import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Search from "../../components/Search/Search";

import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import loadData from "../../services/load-data";

const AllRoute = () => {
  const [routes, setRoutes] = useState<any>([]);
  const [route, setRoute] = useState();

  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState(" ");
  const navigate = useNavigate();
  // const mountedRef = useMountedRef();

  useEffect(() => {
    const getRoute = async () => {
      const url = `http://localhost:9090/routes`;

      const res = await loadData(url);
      setRoutes(res.data.data);
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

  // const getRouteOnClick = async (
  //   routeID: any,
  //   e: React.MouseEvent<HTMLElement>
  // ) => {
  //   e.preventDefault();
  //   const url = ` http://localhost:9090/routes/${routeID}`;
  //   const res = await axios.get(url);
  //   const { data } = res;
  //   setRoute(data.route);
  // };

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
      {/* <Search
        setSearch={(search: any) => setSearch(search)}
        placeHolder="Enter name to search"
      /> */}
      <div className="row mt-2">
        {routes.map((route: any, index: any) => {
          console.log(route);
          return (
            <div className="col" key={index}>
              <Card className="mb-2" bg="dark" style={{ color: "#dbe8ff" }}>
                <Card.Header>{route["routeName"]}</Card.Header>
                <Card.Body>
                  <p>Route ID:{route["_id"]}</p>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur, molestias! Officia dolorum esse nobis
                    aspernatur laborum id dignissimos adipisci debitis hic
                    molestias!
                  </Card.Text>
                  <Card.Title style={{ color: "#fff" }}>
                    No. of Stops:{route["stops"].length}
                  </Card.Title>
                  <Button
                    variant="outline-info"
                    onClick={() => {
                      navigate("../viewRoute", {
                        state: { route: route },
                      });
                    }}
                  >
                    View Route details
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllRoute;
