import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import UnauthorizedPage from "./UnauthorizedPage";

const AdminDashboard = () => {
  // const [users, setUsers] = useState([]);
  // const [fetching, setFetching] = useState(true);
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
