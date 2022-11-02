import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import "./login.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const username = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = e => {
    e.preventDefault();

    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    );
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
              Welcome! <br /> <small>Log in</small>
            </Typography>
          </Box>

          {/* LOGIN BOX */}

          <Box sx={{ width: "400px", height: "500px" }}>
            <Stack
              paddingTop={"120px"}
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
                  ref={password}
                  variant="standard"
                  type={"password"}
                />
                <label>Password</label>
              </div>
              <Button
                size="medium"
                variant="contained"
                sx={{}}
                onClick={handleClick}
                disabled={isFetching}
              >
                {isFetching ? <CircularProgress color="inherit" /> : "Log in"}
              </Button>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
                color={"white"}
              >
                <small>You don't have account?</small>
                <br />
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button size="medium" variant="contained" sx={{}}>
                    {isFetching ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default Login;
