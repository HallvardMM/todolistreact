import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserGrid from "./admin/UserGrid";
import Chart from "./admin/Chart";
import Profile from "./user/Profile";
import CreateUser from "./user/CreateUser";
import Main from "./todolist/Main";
import ListView from "./todolist/ListView";
import ChangeAccess from "./todolist/ChangeAccess";
import BasicHeader from "./common/BasicHeader";
import { Typography } from "@mui/material";
import ThemeContainer from "./common/ThemeContainer";

ReactDOM.render(
  <React.StrictMode>
    <ThemeContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="main" element={<Main />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<UserGrid />} />
          <Route path="adminChart" element={<Chart />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="listview:listId" element={<ListView />} />
          <Route path="changeaccess:listId" element={<ChangeAccess />} />
          <Route
            path="*"
            element={
              <BasicHeader>
                <Typography variant="h3" component="div">
                  There's nothing here!
                </Typography>
              </BasicHeader>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeContainer>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
