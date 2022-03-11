import "./App.css";
import * as React from "react";
import UserGrid from "./admin/UserGrid";
import CreateUser from "./user/CreateUser";
import SignIn from "./user/SignIn";
import UsersLists from "./todolist/UsersLists";
import Profile from "./user/Profile";

import Header from "./common/Header";

export default function App() {
  return (
    <div className="App">
      <Header name="Hallvard10" admin loggedIn>
        <Profile />
      </Header>
    </div>
  );
}
