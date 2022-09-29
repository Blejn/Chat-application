import React, { useContext } from "react";
import "./home.css";
import Feed from "../../components/feed/Feed";
import UsersPage from "../../components/userspage/UsersPage";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {" "}
      <Navbar />
      <div className="home_container">
        <Sidebar />
        <Feed username={user.username} />
        <UsersPage />
      </div>
    </>
  );
};

export default Home;
