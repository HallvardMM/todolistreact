import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import BasicHeader from "./BasicHeader";
import Header from "./Header";
import { Button, Typography } from "@mui/material";

const NoAccess = observer((props) => {
  let authState = Auth;
  const navigate = useNavigate();
  console.log(authState);
  return (
    <div>
      {authState.loggedIn ? (
        <Header>
          <Typography variant="h3" component="div">
            {props.infotext}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/main")}
          >
            Main page
          </Button>
        </Header>
      ) : (
        <BasicHeader>
          <Typography variant="h3" component="div">
            {props.infotext}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Sign In page
          </Button>
        </BasicHeader>
      )}
    </div>
  );
});

export default NoAccess;
