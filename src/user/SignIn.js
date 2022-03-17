import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Auth from "../state/Authentication";
import { postJson } from "../api/postJson";
import { observer } from "mobx-react-lite";

const SignIn = observer(() => {
  let authState = Auth;
  const [values, setValues] = useState({
    name: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/main");
    }
  }, [loggedIn]);

  const validate = (name, password) => {
    postJson(`ToDoList/loginservice/`, {
      name: name,
      password: password,
    }).then((data) => {
      if (data.name) {
        authState.login(data.name, data.admin);
        setLoggedIn(true);
      } else {
        setError(true);
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
        <FormControl error={error} variant="standard">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={values.name}
            onChange={handleChange("name")}
          />
        </FormControl>
        <FormControl error={error} variant="standard">
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
            <FormHelperText id="password-error-text">
              Wrong password or username
            </FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          style={{ marginBottom: "10px" }}
          onClick={() => validate(values.name, values.password)}
        >
          Login
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
