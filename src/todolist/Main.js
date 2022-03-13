import React from "react";
import Header from "../common/Header";
import UsersLists from "./UsersLists";

const Main = () => {
  return (
    <div className="Main">
      <Header>
        <UsersLists></UsersLists>
      </Header>
    </div>
  );
};

export default Main;
