import React, { useState } from "react";
import {
  AppBar,
  Drawer,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material/";
import {
  Menu,
  Person,
  SupervisorAccount,
  BarChart,
  Logout,
  Home,
} from "@mui/icons-material/";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import { postJson } from "../api/json";
import BasicHeader from "./BasicHeader";

const SideList = observer((props) => {
  let authState = Auth;
  const navigate = useNavigate();

  const logout = (name) => {
    postJson("ToDoList/logoutservice/", {
      name: name,
    }).then((data) => {
      if (data.loggedOut) {
        authState.logout(), navigate("/");
      }
    });
  };

  const navigateAndClose = (path) => {
    navigate(path);
    props.close();
  };

  return (
    <div>
      {authState.loggedIn && (
        <div>
          <Typography
            color="primary"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            ToDoList
          </Typography>
          <Typography
            color="primary"
            variant="subtitle1"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Signed In as: {authState.name}
          </Typography>
          <List>
            <ListItem
              onClick={() => navigateAndClose("/home")}
              button
              key={"Home"}
            >
              <ListItemIcon>
                <Home color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem
              onClick={() => navigateAndClose("/profile")}
              button
              key={"Profile"}
            >
              <ListItemIcon>
                <Person color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            {authState.admin && (
              <ListItem
                onClick={() => navigateAndClose("/adminChart")}
                button
                key={"adminChart"}
              >
                <ListItemIcon>
                  <BarChart color="secondary" />
                </ListItemIcon>
                <ListItemText primary={"Chart"} />
              </ListItem>
            )}
            {authState.admin && (
              <ListItem
                onClick={() => navigateAndClose("/admin")}
                button
                key={"Admin"}
              >
                <ListItemIcon>
                  <SupervisorAccount color="secondary" />
                </ListItemIcon>
                <ListItemText primary={"Admin"} />
              </ListItem>
            )}
            <Divider />
            <ListItem
              onClick={() => {
                props.close();
                logout(authState.user);
              }}
              button
              key={"Sign out"}
            >
              <ListItemIcon>
                <Logout color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Sign Out"} />
            </ListItem>
          </List>
        </div>
      )}
      <Outlet />
    </div>
  );
});

const Header = observer((props) => {
  let authState = Auth;
  const [drawer, setDrawer] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {authState.loggedIn ? (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => setDrawer(true)}
                >
                  <Menu />
                </IconButton>
                <Drawer open={!!drawer} onClose={() => setDrawer(false)}>
                  <SideList
                    close={setDrawer}
                    name={authState.user}
                    admin={authState.admin}
                    loggedIn={authState.loggedIn}
                  ></SideList>
                </Drawer>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Signed In as: {authState.user}
                </Typography>
                <Typography
                  onClick={() => navigate("/home")}
                  variant="h6"
                  sx={{ flexGrow: 75 }}
                  component="span"
                  textAlign="center"
                >
                  ToDoList
                </Typography>
                {authState.admin && (
                  <>
                    <Button onClick={() => navigate("/admin")} color="inherit">
                      Admin
                    </Button>
                    <Button
                      onClick={() => navigate("/adminChart")}
                      color="inherit"
                    >
                      Chart
                    </Button>
                  </>
                )}
                <Button onClick={() => navigate("/profile")} color="inherit">
                  Profile
                </Button>
                <Button onClick={() => navigate("/home")} color="inherit">
                  Home
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
          {props.children}
          <Outlet />
        </div>
      ) : (
        <BasicHeader>{props.children}</BasicHeader>
      )}
    </div>
  );
});

export default Header;
