import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "@mui/material/";

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
