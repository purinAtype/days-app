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
import { Header,Todo,Profile } from "./index";

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

const Home = () => {

  return (
    <>
      <Header />
      <main>
        <Router>
          <Switch>
            <Route path={'/todo'} component={Todo}/>
            <Route path={'/profile'} component={Profile}/>
          </Switch>
        </Router>
      </main>
    </>
  );
};

export default Home;
