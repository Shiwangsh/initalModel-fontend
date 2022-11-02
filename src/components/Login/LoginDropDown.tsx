import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

const LoginDropDown = () => {
  //   console.log(localStorage);
  const navigate = useNavigate();
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user") || " ");
    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <FontAwesomeIcon icon={faUser} className="pr-1" />
          {user.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="currentUser">View Profile</Dropdown.Item>

          <Dropdown.Item
            onClick={() => {
              authService.logout();
              navigate("/");
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  return null;
};

export default LoginDropDown;
