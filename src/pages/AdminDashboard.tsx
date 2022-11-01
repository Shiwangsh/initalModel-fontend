import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Home from "./Home";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);

  return (
    <>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default AdminDashboard;
