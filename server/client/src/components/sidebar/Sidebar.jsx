import * as React from "react";
import "./sidebar.css";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Link, useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import GroupIcon from "@mui/icons-material/Group";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ChatIcon from "@mui/icons-material/Chat";
import AllInboxIcon from "@mui/icons-material/AllInbox";

import Divider from "@mui/material/Divider";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

const Sidebar = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="sidebar_container">
      <List
        sx={{
          width: "100%",

          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Items
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => navigate(`/`)}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItemButton>
        <Link
          to={"/chat"}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>

            <ListItemText primary="Chat" />
          </ListItemButton>
        </Link>
      </List>
    </div>
  );
};

export default Sidebar;
