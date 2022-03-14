import React, { useState, useEffect } from "react";
import { fetchJson } from "../api/fetchJson";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PointGroup = observer((props) => {
  let authState = Auth;
  const [pgName, setPgName] = useState("");
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson(`ToDoList/fetchGroup/${props.pgId}/${authState.user}`).then(
      (data) => {
        console.log(data),
          setPgName(data.name),
          setPoints(data.points),
          setLoading(false);
      }
    );
  }, []);

  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Typography variant="h4" component="div">
            {"Group: " + pgName}
          </Typography>
          <div>
            {points?.map((object, id) => (
              <Typography variant="subtitle1" component="div">
                {"Point: " + object.name}
              </Typography>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default PointGroup;
