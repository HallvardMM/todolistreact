import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
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
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const UsersLists = observer(() => {
  const [newListName, setNewListName] = useState("");
  const [ownerLists, setOwnerLists] = useState([]);
  const [writeLists, setWriteLists] = useState([]);
  const [readLists, setReadLists] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [listUpdated, setListUpdated] = useState(false);
  const navigate = useNavigate();
  let authState = Auth;
  useEffect(() => {
    fetchJson(`/ToDoList/getUsersLists/${authState.user}`)
      .then((data) => {
        console.log(data),
          setOwnerLists(data.ownerList),
          setWriteLists(data.writeList),
          setReadLists(data.readList);
      })
      .finally(setLoading(false));
  }, [listUpdated]);

  let listView = (listToView, notDelete) => {
    return listToView?.map((object, id) => (
      <div style={{ width: "300px" }}>
        {notDelete ? (
          <ListItem key={id} onClick={() => navigate(`/listview${object.id}`)}>
            <ListItemText
              primary={"List: " + object.name}
              secondary={"Owner: " + object.owner}
            />
          </ListItem>
        ) : (
          <ListItem
            key={id}
            onClick={() => navigate(`/listview${object.id}`)}
            secondaryAction={
              <IconButton
                color="danger"
                edge="end"
                aria-label="delete"
                onClick={() => deleteList(object.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={"List: " + object.name}
              secondary={"Owner: " + object.owner}
            />
          </ListItem>
        )}
      </div>
    ));
  };

  function sendCreatedList(listName) {
    if (
      //Check if list has length and does not already exist!
      listName.length > 0 &&
      ownerLists.find((l) => l.name === listName) === undefined
    ) {
      setLoadingCreate(true);
      fetchJson(`/ToDoList/createList/${listName}/${authState.user}`)
        .then((data) => {
          console.log(data);
          if (data === undefined || !data.success) {
            setError("Could not create list!");
          } else {
            //Trigger refetch to get ID created by server
            setListUpdated(!listUpdated);
          }
        })
        .finally(setLoadingCreate(false), setNewListName(""));
    } else {
      setError("List name is used or has no name!");
    }
  }

  function deleteList(listId) {
    console.log(listId);
    fetchJson(`/ToDoList/deleteList/${listId}/${authState.user}`).then(
      (data) => {
        console.log(data);
        if (!(data === undefined)) {
          if (data.success) {
            //Trigger refetch to get ID created by server
            setListUpdated(!listUpdated);
          }
        }
      }
    );
  }

  return (
    <div className="UsersList">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h3" component="div">
          Home page
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <div>
            {loadingCreate ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <div>
                <FormControl error={error !== ""} variant="standard">
                  <InputLabel htmlFor="name">Create new list</InputLabel>
                  <Input
                    id="name"
                    value={newListName}
                    onChange={(event) => setNewListName(event.target.value)}
                  />
                  {error !== "" && (
                    <FormHelperText id="createList-error-text">
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => sendCreatedList(newListName)}
                >
                  Create
                </Button>
              </div>
            )}
            <Typography variant="h6" component="div">
              Owner access list
            </Typography>
            <List>{listView(ownerLists, false)}</List>
            <Typography variant="h6" component="div">
              Writer access lists
            </Typography>
            <List>{listView(writeLists, true)}</List>
            <Typography variant="h6" component="div">
              Reader access list
            </Typography>
            <List>{listView(readLists, true)}</List>{" "}
          </div>
        )}
      </div>
    </div>
  );
});
export default UsersLists;
