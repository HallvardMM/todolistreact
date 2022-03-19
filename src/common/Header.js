import { useState } from "react";
import {
  AppBar,
  Drawer,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material/";
import { Menu } from "@mui/icons-material/";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import BasicHeader from "./BasicHeader";
import SideList from "./SideList";

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
