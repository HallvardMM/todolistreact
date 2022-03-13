import React, { useState } from "react";
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
import BasicHeader from "../common/BasicHeader";
import { fetchJson } from "../api/fetchJson";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function CreateUser() {
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
    //createUserService(name: String,email: String,password: Secret)
    if (password.length >= 10) {
      if (validateEmail(email)) {
        fetchJson(
          `ToDoList/createUserService/${name}/${email}/${password}`
        ).then((data) => {
          console.log(data);
          if (data === undefined) {
            setError("Something unexpected happened!");
          } else {
            if (data.success) {
              navigate("/");
            } else {
              setError("User exists!");
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
    <BasicHeader>
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
          <FormControl error={error} variant="standard">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={values.name}
              onChange={handleChange("name")}
            />
          </FormControl>
          <FormControl error={error} variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              value={values.email}
              onChange={handleChange("email")}
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
          </FormControl>
          <FormControl error={error} variant="standard">
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

          <Button variant="contained" onClick={() => navigate("/")}>
            Back
          </Button>
        </div>
      </div>
    </BasicHeader>
  );
}
