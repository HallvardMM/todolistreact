import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import { TextField, MenuItem, Button } from "@mui/material";
import { fetchJson } from "../api/fetchJson";
import Typography from "@mui/material/Typography";
import Header from "../common/Header";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ChangeAccess = observer((props) => {
  let authState = Auth;
  let params = useParams();
  const [loading, setLoading] = useState(true);
  const [listName, setListName] = useState("");
  const [writers, setWriters] = useState([]);
  const [readers, setReaders] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJson(`ToDoList/getList/${params.listId}`).then((data) => {
      setListName(data.name),
        setWriters(data.writer),
        setReaders(data.reader),
        setLoading(false),
        setUpdate(false);
    });
  }, [update]);

  function sendShareAccess(selectedUser, write) {
    fetchJson(
      `/ToDoList/shareList/${params.listId}/${authState.user}/${selectedUser}/${write}`
    ).then((data) => {
      if (data !== undefined) {
        if (data.success) {
          setLoading(true), setUpdate(true);
        }
      }
    });
  }

  function removeAccess(selectedUser) {
    fetchJson(
      `/ToDoList/removeAccess/${params.listId}/${authState.user}/${selectedUser}`
    ).then((data) => {
      if (data !== undefined) {
        if (data.success) {
          setLoading(true), setUpdate(true);
        }
      }
    });
  }

  return (
    <Header>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Typography variant="h3" component="div">
            {"Access to: " + listName}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/listview${params.listId}`)}
          >
            Back
          </Button>
          <Typography variant="h3" component="div">
            Write access
          </Typography>
          {writers.map((object, id) => (
            <div style={{ display: "flex" }}>
              <Typography
                style={{ width: "150px" }}
                variant="h6"
                component="div"
              >
                {object}
              </Typography>
              <Button
                style={{ height: "35px" }}
                variant="contained"
                onClick={() => sendShareAccess(object, false)}
              >
                Read
              </Button>
              <Button
                style={{ height: "35px" }}
                variant="contained"
                onClick={() => removeAccess(object)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Typography variant="h3" component="div">
            Read access
          </Typography>
          {readers.map((object, id) => (
            <div style={{ display: "flex" }}>
              <Typography
                style={{ width: "150px" }}
                variant="h6"
                component="div"
              >
                {object}
              </Typography>

              <Button
                style={{ height: "35px" }}
                variant="contained"
                onClick={() => sendShareAccess(object, true)}
              >
                Write
              </Button>
              <Button
                style={{ height: "35px" }}
                variant="contained"
                onClick={() => removeAccess(object)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </Header>
  );
});

export default ChangeAccess;
