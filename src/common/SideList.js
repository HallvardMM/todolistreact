import { Outlet, useNavigate } from "react-router-dom";
import {
  Typography,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material/";
import {
  Person,
  SupervisorAccount,
  BarChart,
  Logout,
  Home,
} from "@mui/icons-material/";
import { postJson } from "../api/json";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";

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

  const SideItem = (props) => {
    return (
      <ListItem onClick={() => navigateAndClose(props.path)} button>
        <ListItemIcon>{props.children}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    );
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
            <SideItem path={"/home"} text={"Home"}>
              <Home color="secondary" />
            </SideItem>
            <SideItem path={"/profile"} text={"Profile"}>
              <Person color="secondary" />
            </SideItem>

            {authState.admin && (
              <>
                <SideItem path={"/adminChart"} text={"Chart"}>
                  <BarChart color="secondary" />
                </SideItem>
                <SideItem path={"/admin"} text={"Admin"}>
                  <SupervisorAccount color="secondary" />
                </SideItem>
              </>
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

export default SideList;
