import { useState, useEffect } from "react";
import { fetchJson } from "../api/json";
import {
  Button,
  Typography,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material/";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import ShareAccess from "./ShareAccess";
import PointGroup from "./PointGroup";
import Loading from "../common/Loading";

const ListView = observer(() => {
  let params = useParams();
  let authState = Auth;
  const [loading, setLoading] = useState(true);
  const [listName, setListName] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [error, setError] = useState("");
  const [owner, setOwner] = useState("");
  const [writers, setWriters] = useState([]);
  const [readers, setReaders] = useState([]);
  const [pointGroups, setPointGroups] = useState([]);
  const [showShareAccess, setShowShareAccess] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [isReader, setIsReader] = useState(false);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJson(`ToDoList/getList/${params.listId}`).then((data) => {
      setListName(data.name),
        setOwner(data.owner),
        setWriters(data.writer),
        setReaders(data.reader),
        setPointGroups(data.pointGroups),
        setIsOwner(data.owner === authState.user),
        setIsWriter(data.writer.includes(authState.user)),
        setIsReader(data.reader.includes(authState.user));
      setLoading(false);
    });
  }, [update]);

  function sendCreatedGroup(groupName) {
    if (
      //Check if group has length and does not already exist!
      groupName.length > 0 &&
      pointGroups.find((pg) => pg.name === groupName) === undefined
    ) {
      setLoading(true);
      fetchJson(`/ToDoList/createGroup/${params.listId}/${groupName}`)
        .then((data) => {
          if (data === undefined || !data.success) {
            setError("Could not create group!");
          } else {
            //Trigger refetch to get ID created by server
            setUpdate(!update);
          }
        })
        .finally(setNewGroupName(""));
    } else {
      setError("Group name is used or has no name!");
    }
  }

  return (
    <div className="CreateUser">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Typography variant="h3" component="div">
            {listName}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigate("/home")}
            >
              Back
            </Button>
            {isOwner && (
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/changeaccess${params.listId}`)}
                >
                  Change access
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowShareAccess(!showShareAccess)}
                >
                  {showShareAccess ? "Hide share" : "Share access"}
                </Button>
              </div>
            )}
          </div>
          {showShareAccess && (
            <ShareAccess
              listId={params.listId}
              readers={readers}
              writers={writers}
              setShowShareAccess={setShowShareAccess}
            ></ShareAccess>
          )}
          {isOwner && (
            <div>
              <FormControl error={error !== ""} variant="standard">
                <InputLabel htmlFor="groupName">New group</InputLabel>
                <Input
                  id="groupName"
                  value={newGroupName}
                  onChange={(event) => setNewGroupName(event.target.value)}
                />
                {error !== "" && (
                  <FormHelperText id="createGroup-error-text">
                    {error}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => sendCreatedGroup(newGroupName)}
              >
                Create
              </Button>
            </div>
          )}
          {pointGroups?.map((object, id) => (
            <div>
              <PointGroup id={id} pgId={object}></PointGroup>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ListView;
