import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import UserGrid from "./adminPage/UserGrid";

function App() {
  return (
    <div className="App">
      <UserGrid></UserGrid>
    </div>
  );
}

export default App;
