import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";

export default function BasicHeader(props) {
  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ justifyContent: "center" }}>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              component="span"
            >
              ToDoList
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {props.children}
      <Outlet />
    </div>
  );
}
