import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import { TextField, MenuItem, Button } from "@mui/material";
import { fetchJson } from "../api/fetchJson";

const accessTypes = [
  {
    value: "read",
  },
  {
    value: "write",
  },
];

const ShareAccess = observer((props) => {
  let authState = Auth;
  const [access, setAccess] = useState("read");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const handleChange = (event) => {
    setAccess(event.target.value);
  };

  const handleChangeUser = (event) => {
    setSelectedUser(event.target.value);
  };

  useEffect(() => {
    fetchJson("ToDoList/allUsersName/").then((data) => {
      setUsers(data.users.filter((e) => e.name !== authState.user));
      if (data.users[0].name !== authState.user) {
        setSelectedUser(data.users[0].name);
      } else {
        setSelectedUser(data.users[1].name);
      }
    });
  }, []);

  function sendShareAccess() {
    let write = false;
    if (access === "write") {
      write = true;
    }
    fetchJson(
      `/ToDoList/shareList/${props.listId}/${selectedUser}/${write}`
    ).then((data) => {
      if (data !== undefined) {
        if (data.success) {
          props.setShowShareAccess(false);
        }
      }
    });
  }

  return (
    <div
      className="ShareAccess"
      style={{ display: "flex", alignItems: "center" }}
    >
      <TextField
        id="select-accessRight"
        select
        label="Rights"
        value={access}
        onChange={handleChange}
        helperText="Select access rights"
        variant="standard"
      >
        {accessTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <div style={{ width: "20px" }} />
      <TextField
        id="select-user"
        select
        label="User"
        value={selectedUser}
        onChange={handleChangeUser}
        helperText="Select user"
        variant="standard"
      >
        {users.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <Button
        color="secondary"
        style={{ height: "35px" }}
        variant="contained"
        onClick={() => sendShareAccess()}
      >
        Give access
      </Button>
    </div>
  );
});

export default ShareAccess;
