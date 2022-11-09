import {
  faUsers,
  faCreditCard,
  faBusSimple,
  faRoute,
  faTicket,
  faMoneyBills,
  faRobot,
  faBars,
  faHome,
  faUserPlus,
  faEye,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import LoginDropDown from "../Login/LoginDropDown";

const Sidiebar = () => {
  const { collapseSidebar } = useProSidebar();
  const staff: any = localStorage.getItem("user");
  const user = JSON.parse(staff);

  return (
    <Sidebar style={{ color: "#fff" }} defaultCollapsed={true}>
      <Button
        className="m-3"
        variant="outline-info"
        onClick={() => collapseSidebar()}
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Menu style={{ color: "#38b297" }} closeOnClick={true}>
        <MenuItem
          routerLink={<Link to="home" />}
          icon={<FontAwesomeIcon icon={faHome} />}
        >
          Home
        </MenuItem>

        <SubMenu label="Users" icon={<FontAwesomeIcon icon={faUsers} />}>
          <MenuItem
            icon={<FontAwesomeIcon icon={faEye} />}
            routerLink={<Link to="users" />}
          >
            View Users
          </MenuItem>
          <MenuItem
            routerLink={<Link to="createUser" />}
            icon={<FontAwesomeIcon icon={faUserPlus} />}
          >
            Add User
          </MenuItem>
        </SubMenu>

        <MenuItem
          icon={<FontAwesomeIcon icon={faTicket} />}
          routerLink={<Link to="transactions" />}
        >
          All Transactions
        </MenuItem>

        <MenuItem
          routerLink={<Link to="cards" />}
          icon={<FontAwesomeIcon icon={faCreditCard} />}
        >
          Cards
        </MenuItem>
        <MenuItem
          routerLink={<Link to="buses" />}
          icon={<FontAwesomeIcon icon={faBusSimple} />}
        >
          Buses
        </MenuItem>
        <MenuItem
          routerLink={<Link to="routes" />}
          icon={<FontAwesomeIcon icon={faRoute} />}
        >
          Routes
        </MenuItem>
        <MenuItem
          routerLink={<Link to="loadBalance" />}
          icon={<FontAwesomeIcon icon={faMoneyBills} />}
        >
          Load Balance
        </MenuItem>
        <MenuItem
          routerLink={<Link to="simulateTap" />}
          icon={<FontAwesomeIcon icon={faRobot} />}
        >
          Simulate Tap
        </MenuItem>
        {user.staffType === "Admin" ? (
          <SubMenu label="Staffs" icon={<FontAwesomeIcon icon={faUserTie} />}>
            <MenuItem
              icon={<FontAwesomeIcon icon={faEye} />}
              routerLink={<Link to="staffs" />}
            >
              View Staffs
            </MenuItem>
            <MenuItem
              routerLink={<Link to="createStaff" />}
              icon={<FontAwesomeIcon icon={faUserPlus} />}
            >
              Add Staff
            </MenuItem>
          </SubMenu>
        ) : null}
      </Menu>
    </Sidebar>
  );
};

export default Sidiebar;
