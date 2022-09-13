import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Login = () => {
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
              <TextField
                sx={{
                  root: { borderColor: "white" },
                  input: { color: "white" },
                }}
                color="info"
                id="filled-size-normal"
                label="Email"
                variant="standard"
              />
              <TextField
                sx={{ input: { color: "white" }, borderBottomColor: "white" }}
                id="filled-size-normal"
                label="Password"
                variant="standard"
                type={"password"}
              />
              <Button size="medium" variant="contained" sx={{}}>
                Log in
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
                    Sign up
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
