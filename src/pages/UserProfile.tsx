import React from "react";
import { useState } from "react";

import { useLocation } from "react-router-dom";
import EditUser from "../components/User/EditUser";
import ViewUser from "../components/User/ViewUser";

const UserProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);
  const [action, setAction] = useState("view");

  const handleEdit = (action: string) => {
    setAction(action);
  };

  return action === "view" ? (
    <div>
      <ViewUser user={user} onActionChange={handleEdit} />
    </div>
  ) : action === "edit" ? (
    <EditUser user={user} onActionChange={handleEdit} />
  ) : (
    <></>
  );
};

export default UserProfile;
