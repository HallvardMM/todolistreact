import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchJson } from "../api/fetchJson";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";

const UsersLists = observer(() => {
  const [newListName, setNewListName] = useState("");
  const [ownerLists, setOwnerLists] = useState([]);
  const [writeLists, setWriteLists] = useState([]);
  const [readLists, setReadLists] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  let authState = Auth;
  useEffect(() => {
    fetchJson(`/ToDoList/getUsersLists/${authState.user}`)
      .then((data) => {
        setOwnerLists(data.ownerList),
          setWriteLists(data.writeList),
          setReadLists(data.readList);
      })
      .catch(setError(true))
      .finally(setLoading(false));
  }, []);

  let listView = (listToView) => {
    return listToView?.map((object, id) => {
      console.log(object);
      return (
        <ListItem
          key={id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={"List: " + object.name}
            secondary={"Owner: " + object.owner}
          />
        </ListItem>
      );
    });
  };

  return (
    <div className="UsersList">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h3" component="div">
          Home page
        </Typography>
        <FormControl variant="standard">
          <InputLabel htmlFor="name">Create new list</InputLabel>
          <Input
            id="name"
            value={newListName}
            onChange={(x) => setNewListName(x)}
          />
        </FormControl>
        <Button variant="contained" onClick={() => console.log("Create")}>
          Create
        </Button>
        <Typography variant="h6" component="div">
          Owner access list
        </Typography>
        <List>{listView(ownerLists)}</List>

        <Typography variant="h6" component="div">
          Writer access lists
        </Typography>
        <List>{listView(writeLists)}</List>

        <Typography variant="h6" component="div">
          Reader access list
        </Typography>
        <List>{listView(readLists)}</List>
      </div>
    </div>
  );
});
export default UsersLists;
