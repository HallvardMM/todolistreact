import { ListItem, ListItemText, IconButton } from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { fetchJson } from "../api/json";

const DisplayLists = (listToView, notDelete, updateLists) => {
  const navigate = useNavigate();

  function deleteList(listId) {
    fetchJson(`/ToDoList/deleteList/${listId}`).then((data) => {
      if (!(data === undefined)) {
        if (data.success) {
          //Trigger refetch to get ID created by server
          updateLists();
        }
      }
    });
  }

  return listToView?.map((object, id) => (
    <div>
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

export default DisplayLists;
