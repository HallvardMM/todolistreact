import { useState, useEffect } from "react";
import {
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  Button,
  List,
} from "@mui/material/";
import { postJson } from "../api/json";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import Loading from "../common/Loading";
import DisplayLists from "./DisplayLists";

const UsersLists = observer(() => {
  const [newListName, setNewListName] = useState("");
  const [ownerLists, setOwnerLists] = useState([]);
  const [writeLists, setWriteLists] = useState([]);
  const [readLists, setReadLists] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [listUpdated, setListUpdated] = useState(false);
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

  function updateLists() {
    setListUpdated(!listUpdated);
  }

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
            setError("");
            updateLists();
          }
        })
        .finally(setLoading(false), setNewListName(""));
    } else {
      setError("List name is used or has no name!");
    }
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
        <List>{DisplayLists(ownerLists, false, updateLists)}</List>
        <Typography variant="h6" component="div">
          Writer access lists
        </Typography>
        <List>{DisplayLists(writeLists, true, updateLists)}</List>
        <Typography variant="h6" component="div">
          Reader access list
        </Typography>
        <List>{DisplayLists(readLists, true, updateLists)}</List>{" "}
      </div>
    </div>
  );
});
export default UsersLists;
