import { faBus, faRoute, faUsers } from "@fortawesome/free-solid-svg-icons";
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

  useEffect(() => {
    const getUsers = async () => {
      const url = `
        http://localhost:9090/users
      `;
      const res = await axios.get(url, {
        headers: authHeader(),
      });
      const { data } = res;
      setUsers(data.users.length);
    };

    const getRoutes = async () => {
      const url = `http://localhost:9090/routes`;
      const res = await axios.get(url);
      const { data } = res;
      setRoutes(data.routes.length);
    };

    const getBuses = async () => {
      const res = await axios.get("http://localhost:9090/buses");
      const { data } = res;
      setBuses(data.buses.length);
    };

    getUsers();
    getBuses();
    getRoutes();
  }, []);

  return (
    <>
      <div className="container-fluid px-4 mt-4 bg-white">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-info text-white mb-4">
              <Link to={"../users"}>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <p className="text-white">
                    <FontAwesomeIcon icon={faUsers} className="pr-2" />
                    Total Number of Users: {users}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <Link to={"../buses"}>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <p className="text-white">
                    <FontAwesomeIcon icon={faBus} className="pr-2" />
                    Total Number of Buses: {buses}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <Link to={"../routes"}>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <p className="text-white">
                    <FontAwesomeIcon icon={faRoute} className="pr-2" />
                    Total Number of Routes: {routes}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">Total Transactions this month</div>
              <div className="card-body">
                <LineChart />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">Transaction per day this month</div>
              <div className="card-body">
                <BarChart />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl">
            <div className="card mb-4">
              <div className="card-header">Cards</div>
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
