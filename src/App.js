import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Auth from "./state/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchJson } from "./api/json";
import ThemeContainer from "./common/ThemeContainer";
import NoAccess from "./common/NoAccess";
import Header from "./common/Header";
import Loading from "./common/Loading";
import SignIn from "./user/SignIn";
import Profile from "./user/Profile";
import CreateUser from "./user/CreateUser";
import UserGrid from "./admin/UserGrid";
import Chart from "./admin/Chart";
import UsersLists from "./todolist/UsersLists";
import ListView from "./todolist/ListView";
import ChangeAccess from "./todolist/ChangeAccess";

const App = observer(() => {
  let authState = Auth;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchJson("ToDoList/isLoggedIn/")
      .then((data) => {
        if (data.name) {
          authState.login(data.name, data.admin);
        }
      })
      .finally(setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <ThemeContainer>
          <BrowserRouter>
            <Header>
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route
                  path="home"
                  element={
                    <>
                      {authState.loggedIn ? (
                        <UsersLists />
                      ) : (
                        <NoAccess text={"Have to be signed in!"} />
                      )}
                    </>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <>
                      {authState.loggedIn ? (
                        <Profile />
                      ) : (
                        <NoAccess text={"Have to be sigend in!"} />
                      )}
                    </>
                  }
                />
                <Route
                  path="admin"
                  element={
                    <>
                      {authState.admin ? (
                        <UserGrid />
                      ) : (
                        <NoAccess text={"Have to be admin!"} />
                      )}
                    </>
                  }
                />
                <Route
                  path="adminChart"
                  element={
                    <>
                      {authState.admin ? (
                        <Chart />
                      ) : (
                        <NoAccess text={"Have to be admin!"} />
                      )}
                    </>
                  }
                />
                <Route
                  path="createuser"
                  element={
                    <>
                      {!authState.loggedIn ? (
                        <CreateUser />
                      ) : (
                        <NoAccess text={"Cannot be signed in!"} />
                      )}
                    </>
                  }
                />
                <Route
                  path="listview:listId"
                  element={
                    <>
                      {authState.loggedIn ? (
                        <ListView />
                      ) : (
                        <NoAccess text={"Have to be signed in!"} />
                      )}
                    </>
                  }
                />
                <Route
                  path="changeaccess:listId"
                  element={
                    <>
                      {authState.loggedIn ? (
                        <ChangeAccess />
                      ) : (
                        <NoAccess text={"Have to be signed in!"} />
                      )}
                    </>
                  }
                />
                <Route
                  path="*"
                  element={<NoAccess text={"Page not found!"} />}
                />
              </Routes>
            </Header>
          </BrowserRouter>
        </ThemeContainer>
      )}
    </div>
  );
});

export default App;
