import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";

const LoginDropDown = () => {
  //   console.log(localStorage);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        <FontAwesomeIcon icon={faUser} className="pr-1" />
        {localStorage.getItem("name")}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
          {localStorage.getItem("email")}
        </Dropdown.Item>
        <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>

        <Dropdown.Item href="/">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LoginDropDown;
