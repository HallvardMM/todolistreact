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

export default function SignIn(props) {
  const [values, setValues] = useState({
    name: "",
    password: "",
    showPassword: false,
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
          Cannot sign in while signed in
        </Typography>
      )}
      {!props.loggedIn && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" component="div">
            Sign in
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

          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Stay logged in"
            />
          </FormGroup>

          <Button variant="contained" onClick={() => console.log("Create")}>
            Login
          </Button>

          <Button variant="contained" onClick={() => console.log("Return")}>
            Create User
          </Button>
        </div>
      )}
    </div>
  );
}
