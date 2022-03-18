import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import { Button, Typography } from "@mui/material";

const NoAccess = observer((props) => {
  let authState = Auth;
  const navigate = useNavigate();
  return (
    <div>
      {authState.loggedIn ? (
        <div>
          <Typography variant="h3" component="div">
            {props.text}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/home")}
          >
            Home
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h3" component="div">
            {props.text}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Sign In page
          </Button>
        </div>
      )}
    </div>
  );
});

export default NoAccess;
