import React, { useState } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

export default function CreateUser(props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    showPassword: false,
    showRePassword: false,
  });

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

  return (
    <div className="CreateUser">
      {props.loggedIn && (
        <Typography variant="h3" component="div">
          Cannot create user while logged in
        </Typography>
      )}
      {!props.loggedIn && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" component="div">
            Create user
          </Typography>
          <FormControl variant="standard">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={values.name}
              onChange={handleChange("name")}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              value={values.email}
              onChange={handleChange("email")}
            />
          </FormControl>
          <FormControl variant="standard">
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
          <FormControl variant="standard">
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
          </FormControl>

          <Button variant="contained" onClick={() => console.log("Create")}>
            Create
          </Button>

          <Button variant="contained" onClick={() => console.log("Return")}>
            Return
          </Button>
        </div>
      )}
    </div>
  );
}
