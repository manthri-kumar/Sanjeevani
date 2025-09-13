import React, { useState } from "react";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import "./Profile.css";

const Profile = () => {
  const [selected, setSelected] = useState("profile");

  return (
    <div className="profile-container">
      <ProfileLeft selected={selected} setSelected={setSelected} />
      <ProfileRight selected={selected} />
    </div>
  );
};

export default Profile;
