import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchJson, postJson } from "../api/json";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import Loading from "../common/Loading";

const UsersLists = observer(() => {
  const [newListName, setNewListName] = useState("");
  const [ownerLists, setOwnerLists] = useState([]);
  const [writeLists, setWriteLists] = useState([]);
  const [readLists, setReadLists] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [listUpdated, setListUpdated] = useState(false);
  const navigate = useNavigate();
  let authState = Auth;
  useEffect(() => {
    postJson(`/ToDoList/getUsersLists/`, {
      name: authState.user,
    })
      .then((data) => {
        setOwnerLists(data.ownerList),
          setWriteLists(data.writeList),
          setReadLists(data.readList);
      })
      .finally(setLoading(false));
  }, [listUpdated]);

  let listView = (listToView, notDelete) => {
    return listToView?.map((object, id) => (
      <div /* style={{ width: "300px" }} */>
        {notDelete ? (
          <ListItem
            button
            key={id}
            onClick={() => navigate(`/listview${object.id}`)}
          >
            <ListItemText
              primary={"List: " + object.name}
              secondary={"Owner: " + object.owner}
            />
          </ListItem>
        ) : (
          <ListItem
            key={id}
            button
            onClick={() => navigate(`/listview${object.id}`)}
            secondaryAction={
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(), deleteList(object.id);
                }}
                color="danger"
                edge="end"
                aria-label="delete"
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
      setLoading(true);
      postJson("/ToDoList/createList/", {
        listName: listName,
        name: authState.user,
      })
        .then((data) => {
          if (data === undefined || !data.success) {
            setError("Could not create list!");
          } else {
            //Trigger refetch to get ID created by server
            setListUpdated(!listUpdated);
          }
        })
        .finally(setLoading(false), setNewListName(""));
    } else {
      setError("List name is used or has no name!");
    }
  }

  function deleteList(listId) {
    setLoading(true);
    fetchJson(`/ToDoList/deleteList/${listId}`).then((data) => {
      if (!(data === undefined)) {
        if (data.success) {
          //Trigger refetch to get ID created by server
          setListUpdated(!listUpdated);
        }
      }
    });
  }

  return (
    <div className="UsersList">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h3" component="div">
          Home
        </Typography>
        {loading ? (
          <Loading />
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
    </div>
  );
});
export default UsersLists;
