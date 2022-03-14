import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";

const SideList = observer(() => {
  let authState = Auth;

  const navigate = useNavigate();
  return (
    <div>
      {authState.loggedIn && (
        <div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDoList
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
            Signed In as: {authState.name}
          </Typography>
          <List>
            <ListItem
              onClick={() => navigate("/profile")}
              button
              key={"Profile"}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>

            {authState.admin && (
              <ListItem onClick={() => navigate("/admin")} button key={"Admin"}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary={"Admin"} />
              </ListItem>
            )}
            <Divider />
            <ListItem
              onClick={() => {
                authState.logout(), navigate("/");
              }}
              button
              key={"Logout"}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {authState.loggedIn && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setDrawer(!drawer)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
              <SideList
                name={authState.user}
                admin={authState.admin}
                loggedIn={authState.loggedIn}
              ></SideList>
            </Drawer>
            {authState.loggedIn && (
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Signed In as: {authState.user}
              </Typography>
            )}
            <Typography
              onClick={() => navigate("/main")}
              variant="h6"
              sx={{ flexGrow: 75 }}
              component="span"
              textAlign="center"
            >
              ToDoList
            </Typography>
            {authState.admin && (
              <Button onClick={() => navigate("/admin")} color="inherit">
                Admin
              </Button>
            )}
            {authState.loggedIn && (
              <Button onClick={() => navigate("/profile")} color="inherit">
                Profile
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {props.children}
      <Outlet />
    </div>
  );
});

export default Header;
