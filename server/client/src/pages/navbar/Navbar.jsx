import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import "./navbar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  const [anchorEl, setAnchorEl] = React.useState(null);
  let navigate = useNavigate();
  let location = useLocation();

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  //MOBILE MENU TOP -----------------------------------------------------------------

  //MOBILE MENU BOTTOM -----------------------------------------------------------------------------

  return (
    <Box sx={{ flexGrow: 1, zIndex: 5, position: "fixed", width: "100%" }}>
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(to right, #1587d8, #36bbd3, #3ba4eb);",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              SOCIALBOOK
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              sx={{ paddingBottom: "0px" }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={9} color="error">
                <Link
                  to={"/chat"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <ChatIcon sx={{ paddingBottom: "0px" }} />
                </Link>
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              {user.avatar ? (
                <Link
                  to={`/profile/${user.username}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Avatar
                    src={PF + user.avatar}
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    sx={{
                      position: "relative",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "auto",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: 30,
                      height: 30,
                    }}
                  ></Avatar>
                </Link>
              ) : (
                <Avatar></Avatar>
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
