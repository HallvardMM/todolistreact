import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Auth from "../state/Authentication";
import { postJson } from "../api/json";
import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
  Typography,
  IconButton,
  Button,
} from "@mui/material/";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import validateEmail from "../common/Email";

const CreateUser = observer(() => {
  let authState = Auth;
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    showPassword: false,
    showRePassword: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.loggedIn) {
      navigate("/home");
    }
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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

  const sendUser = (name, email, password) => {
    if (password.length >= 10) {
      if (validateEmail(email)) {
        postJson(`ToDoList/createUserService/`, {
          name: name,
          email: email,
          password: password,
        }).then((data) => {
          if (data === undefined) {
            setError("Something unexpected happened!");
          } else {
            if (data.success) {
              navigate("/");
            } else if (data.exists) {
              setError("User exists!");
            } else {
              setError("Something unexpected happened!");
            }
          }
        });
      } else {
        setError("Not valid email!");
      }
    } else {
      setError("Password must be more than 10 chars");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" component="div">
          Create user
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
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={values.email}
            onChange={handleChange("email")}
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
        </FormControl>
        <FormControl error={error !== ""} variant="standard">
          <InputLabel htmlFor="rePassword">Re-enter password</InputLabel>
          <Input
            id="rePassword"
            type={values.showRePassword ? "text" : "password"}
            value={values.rePassword}
            onChange={handleChange("rePassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle re-enter password visibility"
                  onClick={() => handleClickShowPassword(true)}
                  onMouseDown={() => handleMouseDownPassword}
                >
                  {values.showRePassword ? <VisibilityOff /> : <Visibility />}
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
          onClick={() => {
            if (values.password === values.rePassword) {
              sendUser(values.name, values.email, values.password);
            } else {
              setError("Passwords are not the same");
            }
          }}
        >
          Create
        </Button>

        <Button
          color="secondary"
          variant="contained"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </div>
    </div>
  );
});

export default CreateUser;
