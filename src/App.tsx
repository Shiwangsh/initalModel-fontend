import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Cards from "./pages/Cards";
import Buses from "./pages/Buses";
import BusRoutes from "./pages/Routes";
import LoadBalance from "./pages/LoadBalance";

import ViewRoute from "./components/Route/ViewRoute";

import UserProfile from "./pages/UserProfile";

import AllUsers from "./pages/Users";

import ReactLoading from "react-loading";
import EditCard from "./components/Card/EditCard";
import Tickets from "./pages/Tickets";
import CreateUser from "./components/User/CreateUser";
import CreateBus from "./components/Bus/CreateBus";
import CreateRoute from "./components/Route/CreateRoute";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="dashboard" element={<AdminDashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="cards" element={<Cards />} />
          <Route path="buses" element={<Buses />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="routes" element={<BusRoutes />} />
          <Route path="editCard" element={<EditCard />} />
          <Route path="viewRoute" element={<ViewRoute />} />
          <Route path="loadBalance" element={<LoadBalance />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="createBus" element={<CreateBus />} />
          <Route path="createRoute" element={<CreateRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
