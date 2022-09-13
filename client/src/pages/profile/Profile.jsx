import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import UsersPage from "../../components/userspage/UsersPage";
import UserProfile from "../../components/userProfile/UserProfile";
const Profile = () => {
  return (
    <>
      {" "}
      <Navbar />
      <div className="home_container">
        <Sidebar />
        <UserProfile />
      </div>
    </>
  );
};

export default Profile;
