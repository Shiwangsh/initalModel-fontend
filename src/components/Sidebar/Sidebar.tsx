import {
  faUsers,
  faCreditCard,
  faBusSimple,
  faRoute,
  faMoneyBills,
  faRobot,
  faBars,
  faHome,
  faUserPlus,
  faEye,
  faUserTie,
  faFileInvoiceDollar,
  faPlus,
  faSearch,
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

const Sidiebar = () => {
  const { collapseSidebar } = useProSidebar();
  const staff: any = localStorage.getItem("user");
  const user = JSON.parse(staff);

  return (
    <Sidebar
      backgroundColor="#252525"
      defaultCollapsed={true}
      style={{ color: "#2bc9a9b5" }}
    >
      <Button
        className="m-3"
        variant="outline-info"
        onClick={() => collapseSidebar()}
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>
      {/* style={{ color: "#38b297" }} */}
      <Menu closeOnClick={true}>
        <MenuItem
          routerLink={<Link to="home" />}
          icon={<FontAwesomeIcon icon={faHome} size="lg" />}
        >
          Home
        </MenuItem>

        <SubMenu
          label="Users"
          icon={<FontAwesomeIcon icon={faUsers} size="lg" />}
        >
          <MenuItem
            icon={<FontAwesomeIcon icon={faEye} size="lg" />}
            routerLink={<Link to="users" />}
          >
            View Users
          </MenuItem>
          <MenuItem
            routerLink={<Link to="createUser" />}
            icon={<FontAwesomeIcon icon={faUserPlus} size="lg" />}
          >
            Add User
          </MenuItem>
        </SubMenu>

        <MenuItem
          icon={<FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />}
          routerLink={<Link to="transactions" />}
        >
          Transactions
        </MenuItem>

        <MenuItem
          routerLink={<Link to="cards" />}
          icon={<FontAwesomeIcon icon={faCreditCard} size="lg" />}
        >
          Cards
        </MenuItem>
        <SubMenu
          label="Buses"
          icon={<FontAwesomeIcon icon={faBusSimple} size="lg" />}
        >
          <MenuItem
            routerLink={<Link to="buses" />}
            icon={<FontAwesomeIcon icon={faEye} size="lg" />}
          >
            View Buses
          </MenuItem>
          <MenuItem
            routerLink={<Link to="createBus" />}
            icon={<FontAwesomeIcon icon={faPlus} size="lg" />}
          >
            Add a Bus
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Routes"
          icon={<FontAwesomeIcon icon={faRoute} size="lg" />}
        >
          <MenuItem
            routerLink={<Link to="routes" />}
            icon={<FontAwesomeIcon icon={faEye} size="lg" />}
          >
            View Routes
          </MenuItem>
          <MenuItem
            routerLink={<Link to="createRoute" />}
            icon={<FontAwesomeIcon icon={faPlus} size="lg" />}
          >
            Add Route
          </MenuItem>
        </SubMenu>
        <hr style={{ background: "#76fff4", height: "1px" }} />
        {user.staffType === "Admin" ? (
          <SubMenu
            label="Staffs"
            icon={<FontAwesomeIcon icon={faUserTie} size="lg" />}
          >
            <MenuItem
              icon={<FontAwesomeIcon icon={faEye} size="lg" />}
              routerLink={<Link to="staffs" />}
            >
              View Staffs
            </MenuItem>
            <MenuItem
              routerLink={<Link to="createStaff" />}
              icon={<FontAwesomeIcon icon={faUserPlus} size="lg" />}
            >
              Add Staff
            </MenuItem>
          </SubMenu>
        ) : null}
        {user.staffType === "Admin" ? (
          <MenuItem
            routerLink={<Link to="loadBalance" />}
            icon={<FontAwesomeIcon icon={faMoneyBills} size="lg" />}
          >
            Load Balance
          </MenuItem>
        ) : null}
        {user.staffType === "Admin" ? (
          <MenuItem
            routerLink={<Link to="simulateTap" />}
            icon={<FontAwesomeIcon icon={faRobot} size="lg" />}
          >
            Simulate Tap
          </MenuItem>
        ) : null}
        {user.staffType === "Admin" ? (
          <MenuItem
            routerLink={<Link to="searchRoute" />}
            icon={<FontAwesomeIcon icon={faSearch} size="lg" />}
          >
            Search Route
          </MenuItem>
        ) : null}
      </Menu>
    </Sidebar>
  );
};

export default Sidiebar;
