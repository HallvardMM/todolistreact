import React, { useState, useEffect, useRef } from "react";
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

function SideList(props) {
  return (
    <div>
      {props.loggedIn && (
        <div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDoList
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
            Signed In as: {props.name}
          </Typography>
          <List>
            <ListItem button key={"Profile"}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            {props.admin && (
              <ListItem button key={"Admin"}>
                <ListItemIcon>
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText primary={"Admin"} />
              </ListItem>
            )}
            <Divider />
            <ListItem button key={"Logout"}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </div>
      )}
    </div>
  );
}

export default function Header(props) {
  const [drawer, setDrawer] = useState(false);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {props.loggedIn && (
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
                name={props.name}
                admin={props.admin}
                loggedIn={props.loggedIn}
              ></SideList>
            </Drawer>
            {props.loggedIn && (
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Signed In as: {props.name}
              </Typography>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 75 }}>
              ToDoList
            </Typography>
            {props.admin && <Button color="inherit">Admin</Button>}
            {props.loggedIn && <Button color="inherit">Profile</Button>}
          </Toolbar>
        </AppBar>
      </Box>
      {props.children}
    </div>
  );
}
