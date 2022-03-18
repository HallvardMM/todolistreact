import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  IconButton,
  FormHelperText,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
  Button,
} from "@mui/material/";
import { VisibilityOff, Visibility } from "@mui/icons-material/";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import { postJson } from "../api/json";

const SignIn = observer(() => {
  let authState = Auth;
  const [values, setValues] = useState({
    name: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    if (loggedIn || authState.loggedIn) {
      navigate("/home");
    }
  }, [loggedIn, authState.loggedIn]);

  const validate = (name, password) => {
    postJson("ToDoList/loginservice/", {
      name: name,
      password: password,
    }).then((data) => {
      if (data.name) {
        authState.login(data.name, data.admin);
        setLoggedIn(true);
      } else if (data.errorNamePass) {
        setError("Wrong username or password!");
      } else {
        setError("Something unexpected happened!");
      }
    });
  };

  const handleClickShowPassword = (rePassword) => {
    if (rePassword) {
      setValues({
        ...values,
        showRePassword: !values.showRePassword,
      });
    } else {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault;
  };

  return (
    <div
      className="SignIn"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <Typography variant="h3" component="div">
          Sign in
        </Typography>
        <FormControl error={error !== ""} variant="standard">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={values.name}
            onChange={handleChange("name")}
          />
        </FormControl>
        <FormControl error={error !== ""} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(false)}
                  onMouseDown={() => handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {error && (
            <FormHelperText id="password-error-text">{error}</FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          style={{ marginBottom: "10px" }}
          onClick={() => validate(values.name, values.password)}
        >
          Sign in
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/createuser")}
        >
          Create User
        </Button>
      </div>
    </div>
  );
});

export default SignIn;
