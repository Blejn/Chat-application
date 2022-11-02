import React, { useContext, useState } from "react";
import "./home.css";
import Feed from "../../components/feed/Feed";
import UsersPage from "../../components/userspage/UsersPage";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { isBrowser, isMobile } from "react-device-detect";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {isMobile ? (
        <>
          <Navbar />
          <div className="mainpage_container">
            <Feed username={user.username} />
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="home_container">
            <div className="sidenav_container">
              <Sidebar />
            </div>
            <div className="mainpage_container">
              <Feed username={user.username} />
            </div>
            <div className="userpage_container">
              <UsersPage />
            </div>
          </div>
        </>
      )}{" "}
    </>
  );
};

export default Home;
