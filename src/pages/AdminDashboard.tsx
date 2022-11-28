import Sidiebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar";
import UnauthorizedPage from "./UnAuthPage/UnauthorizedPage";
import LoginDropDown from "../components/Login/LoginDropDown";
import Footer from "../components/Footer/Footer";

const AdminDashboard = () => {
  if (localStorage.getItem("user")) {
    return (
      <>
        <div
          style={{
            display: "flex",
            backgroundColor: "#e7e7e7",
            height: "100vh",
          }}
        >
          {/* <Navbar /> */}
          <Sidiebar />
          <div style={{ width: "100%" }}>
            <div className="float-right m-3">
              <LoginDropDown />
            </div>
            <Outlet />
          </div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
  return <UnauthorizedPage />;
};

export default AdminDashboard;
