import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Cards from "./pages/Card/Cards";
import Buses from "./pages/Bus/Buses";
import BusRoutes from "./pages/Route/Routes";
import LoadBalance from "./pages/Card/LoadBalance";
import ViewRoute from "./components/Route/ViewRoute";
import UserProfile from "./pages/User/UserProfile";
import AllUsers from "./pages/User/Users";
import CreateUser from "./components/User/CreateUser";
import CreateBus from "./components/Bus/CreateBus";
import CreateRoute from "./components/Route/CreateRoute";
import Home from "./pages/Home";
import UnauthorizedPage from "./pages/UnAuthPage/UnauthorizedPage";
import Notfound from "./pages/UnAuthPage/NotFound";
import CurrentUser from "./pages/CurrentUser";
import Transactions from "./pages/Transaction/Transactions";
import ViewTransaction from "./components/Transaction/ViewTransaction";
import ViewCard from "./components/Card/ViewCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="dashboard" element={<AdminDashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="transactions" element={<Transactions />} />

          <Route path="cards" element={<Cards />} />
          <Route path="buses" element={<Buses />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="routes" element={<BusRoutes />} />
          <Route path="viewCard" element={<ViewCard />} />
          <Route path="viewRoute" element={<ViewRoute />} />
          <Route path="loadBalance" element={<LoadBalance />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="createBus" element={<CreateBus />} />
          <Route path="createRoute" element={<CreateRoute />} />
          <Route path="currentUser" element={<CurrentUser />} />
          <Route path="viewTransaction" element={<ViewTransaction />} />
        </Route>
        <Route path="401" element={<UnauthorizedPage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
