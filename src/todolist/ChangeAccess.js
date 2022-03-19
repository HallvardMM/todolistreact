import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { fetchJson } from "../api/json";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../common/Loading";

const ChangeAccess = () => {
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
      `/ToDoList/shareList/${params.listId}/${selectedUser}/${write}`
    ).then((data) => {
      if (data !== undefined) {
        if (data.success) {
          setLoading(true), setUpdate(true);
        }
      }
    });
  }

  function removeAccess(selectedUser) {
    fetchJson(`/ToDoList/removeAccess/${params.listId}/${selectedUser}`).then(
      (data) => {
        if (data !== undefined) {
          if (data.success) {
            setLoading(true), setUpdate(true);
          }
        }
      }
    );
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Typography variant="h3" component="div">
            {"Access to: " + listName}
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate(`/listview${params.listId}`)}
          >
            Back
          </Button>
          <Typography variant="h3" component="div">
            Write access
          </Typography>
          {writers.map((object, id) => (
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <Typography
                style={{ width: "150px" }}
                variant="h6"
                component="div"
              >
                {object}
              </Typography>
              <Button
                color="secondary"
                style={{ height: "35px" }}
                variant="contained"
                onClick={() => sendShareAccess(object, false)}
              >
                Read
              </Button>
              <Button
                color="danger"
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
                color="secondary"
                style={{ height: "35px" }}
                variant="contained"
                onClick={() => sendShareAccess(object, true)}
              >
                Write
              </Button>
              <Button
                color="danger"
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
    </div>
  );
};

export default ChangeAccess;
