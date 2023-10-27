import React, { useState, useCallback } from "react";
import {
  Link,
  useHistory,
  useParams,
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HelpIcon from '@material-ui/icons/Help';
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ChatIcon from "@material-ui/icons/Chat";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TodayIcon from "@material-ui/icons/Today";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth , db } from "../firebase/index";
import { Mail } from "@material-ui/icons";
import userEvent from "@testing-library/user-event";
import { Todo,Profile } from "./index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
}));

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);

  const handleLogout = () => {
    auth
      .signOut()
      .then((result) => {
        // history.push("/signin");
        console.log("sign out successfully.");
        // ログイン画面に戻る等
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  let user = auth.currentUser;

  return (
    <>
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={toggle}/>
          </IconButton>

          <Drawer
            open={open}
            docked={false}
            onRequestChange={toggle}
          >
          <div className={classes.list}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={toggle}>
                <CloseIcon/>
              </IconButton>
            </div>
            <Divider />
            <List >
              <ListItem button component={Link} to="/" >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
              <ListItem button component={Link} to="/profile" >
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={"Apply"} />
              </ListItem>
              <ListItem button component={Link} to="/todo" >
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={"Todo"} />
              </ListItem>
              <ListItem button >
                <ListItemIcon><ChatIcon /></ListItemIcon>
                <ListItemText primary={"Chat"} />
              </ListItem>
              <ListItem button >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={"Post"} />
              </ListItem>
              <ListItem button >
                <ListItemIcon><TodayIcon /></ListItemIcon>
                <ListItemText primary={"calendar"} />
              </ListItem>
              <ListItem button >
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary={"Setting"} />
              </ListItem>
              <ListItem button >
                <ListItemIcon><HelpIcon /></ListItemIcon>
                <ListItemText primary={"Help"} />
              </ListItem>
            </List>
            <Divider />
            <div className="userContent">
              <div className="userInner">
              <p id="userName" className="userName">{user.displayName}</p>
              <p id="userEmail" className="userEmail">{user.email}</p>
              </div>
            </div>
          </div>
          </Drawer>

          <Typography variant="h6" className={classes.title}>
            DaysApp
          </Typography>
          <div className="logoutHeader">
            <Button color="inherit" onClick={handleLogout} >
              LOGOUT　<ExitToAppIcon />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
    </>
  );
};

export default Header;
