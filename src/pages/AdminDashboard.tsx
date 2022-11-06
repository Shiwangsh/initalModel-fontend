import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import UnauthorizedPage from "./UnAuthPage/UnauthorizedPage";

const AdminDashboard = () => {
  if (localStorage.getItem("user")) {
    return (
      <>
        <Navbar />
        <section>
          <Outlet />
        </section>
      </>
    );
  }
  return <UnauthorizedPage />;
};

export default AdminDashboard;
