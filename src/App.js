import "./App.css";
import React from "react";
import SignIn from "./user/SignIn";
import BasicHeader from "./common/BasicHeader";

export default function App() {
  return (
    <div className="App">
      <BasicHeader>
        <SignIn />
      </BasicHeader>
    </div>
  );
}
