import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const FilterUser = () => {
  const [user, setUser] = useState<any>();
  const [userID, setUserID] = useState("");

  const renderUser = (user: any) => {
    return (
      <Table striped borderless hover responsive>
        <tbody>
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.userType}</td>
            <td>{user.address}</td>
            <td>{user.contactNumber}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  const getUser = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const res = await axios.get(`http://localhost:9090/users/${userID}`);
    const { data } = res;

    setUser(data.user);

    console.log("====data====> ", data);
    console.log("----user--->", user);
  };
  return (
    <form className="form-inline p-3">
      {/* <div className="form-group mb-2">
        <label className="form-control-plaintext">Email</label>
      </div> */}
      <div className="form-group mx-sm-3 mb-2 ">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Id to search"
          onChange={(e) => setUserID(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary mb-2" onClick={getUser}>
        Search
      </button>
      {user && renderUser(user)}
    </form>

    // <form>
    //   <label>Name </label>
    //   <input
    //     type="text"
    //     id="fname"
    //     name="fname"
    //     onChange={(e) => setUserID(e.target.value)}
    //   ></input>
    //   <br></br>
    //   <Button variant="success" onClick={() => getUser()}>
    //     Search
    //   </Button>
    //   {user && renderUser(user)}
    // </form>
  );
};

export default FilterUser;
