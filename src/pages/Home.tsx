import {
  faArrowDown,
  faArrowUp,
  faBus,
  faFileInvoiceDollar,
  faRoute,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";
import authHeader from "../services/auth-header";

const Home = () => {
  const [users, setUsers] = useState();
  const [buses, setBuses] = useState();
  const [routes, setRoutes] = useState();
  const [transactionsToday, setTransactionsToday] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const url = `
        http://localhost:9090/users
      `;
      const res = await axios.get(url, {
        headers: authHeader(),
      });
      const { data } = res;
      setUsers(data.result);
    };

    const getRoutes = async () => {
      const url = `http://localhost:9090/routes`;
      const res = await axios.get(url, { headers: authHeader() });
      const { data } = res;
      setRoutes(data.result);
    };

    const getBuses = async () => {
      const res = await axios.get("http://localhost:9090/buses", {
        headers: authHeader(),
      });
      const { data } = res;
      setBuses(data.result);
    };
    const getTransactionsToday = async () => {
      const res = await axios.get("http://localhost:9090/transactions/today", {
        headers: authHeader(),
      });
      const { data } = res;
      setTransactionsToday(data.result);
    };
    getUsers();
    getBuses();
    getRoutes();
    getTransactionsToday();
  }, []);

  return (
    <>
      <div className="container-fluid px-4 mt-4">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-c-dark text-white mb-4">
              <Link to={"../users"}>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <p className="text-muted">Total Number of Users</p>
                  <h3 className="text-white">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="pr-2"
                      color="#30D5C8"
                    />
                  </h3>
                  <div
                    style={{
                      left: "50px",
                      top: "0px",

                      fontWeight: "700",
                      fontSize: "28px",
                      lineHeight: "34px",

                      color: "#FFFFFF",
                    }}
                  >
                    {users}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-c-dark mb-4">
              <Link to={"../buses"}>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <p className="text-muted">Total Number of Buses</p>
                  <h3 className="text-white">
                    <FontAwesomeIcon
                      icon={faBus}
                      className="pr-2"
                      color="#30D5C8"
                    />
                  </h3>
                  <div
                    style={{
                      left: "50px",
                      top: "0px",
                      fontWeight: "700",
                      fontSize: "28px",
                      lineHeight: "34px",
                      color: "#FFFFFF",
                    }}
                  >
                    {buses}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-c-dark text-white mb-4">
              <Link to={"../routes"}>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <p className="text-muted">Total Number of Routes</p>
                  <h3 className="text-white">
                    <FontAwesomeIcon
                      icon={faRoute}
                      className="pr-2"
                      color="#30D5C8"
                    />
                  </h3>
                  <div
                    style={{
                      left: "50px",
                      top: "0px",

                      fontWeight: "700",
                      fontSize: "28px",
                      lineHeight: "34px",

                      color: "#FFFFFF",
                    }}
                  >
                    {routes}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <h5 className="p-2">Total Transactions this month</h5>
              <div className="card-body custom-bar-chart-div">
                <BarChart />
              </div>
            </div>
          </div>
          <div className="col">
            {/* <div className="card"> */}
            <div className="card mb-2">
              <p className="text-muted m-2">Today's Transaction #</p>
              <h2 className="text-left pl-4">
                <span>{transactionsToday}</span>
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  className="float-right mr-5"
                  color="#30D5C8"
                />
              </h2>
              <p className="m-2">
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="mr-2"
                  color="#00b35f"
                />
                <span className="f-right">2.5% since yesterday</span>
              </p>
            </div>
            {/* </div> */}

            <div className="card  mb-2">
              <p className="text-muted m-2">Distance Travelled Today</p>
              <h2 className="text-left pl-4">
                <span>390km</span>
                <FontAwesomeIcon
                  icon={faRoute}
                  className="float-right mr-5"
                  color="#30D5C8"
                />
              </h2>
              <p className="m-2">
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="mr-2"
                  color="#ff0000"
                />
                <span className="f-right">2.5% since yesterday</span>
              </p>
            </div>

            <div className="card">
              <h5 className="p-2">Cards</h5>
              <div className="card-body">
                <PieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
