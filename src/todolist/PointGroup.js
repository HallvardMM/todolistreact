import { useState, useEffect } from "react";
import { fetchJson } from "../api/json";
import Typography from "@mui/material/Typography";
import Loading from "../common/Loading";

const PointGroup = (props) => {
  const [pgName, setPgName] = useState("");
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson(`ToDoList/fetchGroup/${props.pgId}`).then((data) => {
      setPgName(data.name), setPoints(data.points), setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Typography variant="h4" component="div">
            {"Group: " + pgName}
          </Typography>
          <div>
            {points?.map((object, id) => (
              <Typography key={object.name} variant="subtitle1" component="div">
                {"Point: " + object.name}
              </Typography>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PointGroup;
