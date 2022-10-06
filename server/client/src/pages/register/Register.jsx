import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { axiosInstance } from "../../config";
const Register = () => {
  const navigate = useNavigate();
  const email = useRef();
  const username = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const password = useRef();
  const repeatPassword = useRef();
  const notify = () => toast("Password doesn't match");
  const notifyUser = () =>
    toast("Ups something gone wrong..., Can't create account");
  const registerHandler = async e => {
    e.preventDefault();
    if (repeatPassword.current.value !== password.current.vaue) {
      notify();
    }
    const user = {
      username: username.current.value,
      email: email.current.value,
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      password: password.current.value,
    };
    try {
      await axiosInstance.post("/auth/register", user);
      navigate.push("/login");
    } catch (error) {
      notifyUser();
    }
  };
  return (
    <div
      className="login_container"
      style={{
        padding: 0,
        width: "100%",
        height: "100vh",

        background: "linear-gradient(to right, #1587d8, #36bbd3, #3ba4eb)",
        margin: 0,
      }}
    >
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          paddingTop: "100px",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {/* TITLE BOX */}
          <Box
            sx={{
              width: "400px",
              height: "500px",
            }}
          >
            {" "}
            <Typography
              variant="h4"
              gutterBottom
              paddingTop={"150px"}
              align="center"
              color={"white"}
            >
              Registration <br />
              <Link to="/login" style={{ textDecoration: "none" }}>
                <small style={{ fontSize: "16px" }}>back to login page</small>
              </Link>
            </Typography>
          </Box>

          {/* LOGIN BOX */}
          <Box sx={{ width: "400px", height: "500px" }}>
            <Stack
              paddingTop={"0px"}
              direction="column"
              spacing={4}
              alignItems="center"
              justifyContent="center"
            >
              {/* INPUTS */}{" "}
              <div className="input-container">
                <input
                  autoComplete="false"
                  required
                  ref={email}
                  variant="standard"
                  type={"text"}
                />
                <label>Email</label>
              </div>
              <div className="input-container">
                <input
                  autoComplete="false"
                  required
                  ref={username}
                  variant="standard"
                  type={"text"}
                />
                <label>Username</label>
              </div>
              <div className="input-container">
                <input
                  autoComplete="false"
                  required
                  ref={firstname}
                  variant="standard"
                  type={"text"}
                />
                <label>Firstname</label>
              </div>
              <div className="input-container">
                <input
                  autoComplete="false"
                  required
                  ref={lastname}
                  variant="standard"
                  type={"text"}
                />
                <label>Lastname</label>
              </div>
              <div className="input-container">
                <input
                  autoComplete="false"
                  required
                  ref={password}
                  variant="standard"
                  type={"text"}
                />
                <label>Password</label>
              </div>
              <div className="input-container">
                <input
                  autoComplete="false"
                  required
                  ref={repeatPassword}
                  variant="standard"
                  type={"text"}
                />
                <label>Repeat Password</label>
              </div>
              <Button
                onClick={registerHandler}
                size="medium"
                variant="contained"
                sx={{}}
              >
                Sign up
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Register;
