import React from "react";
import "./home.css";
import Feed from "../../components/feed/Feed";
import UsersPage from "../../components/userspage/UsersPage";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const Home = () => {
  return (
    <>
      {" "}
      <Navbar />
      <div className="home_container">
        <Sidebar />
        <Feed />
        <UsersPage />
      </div>
    </>
  );
};

export default Home;
