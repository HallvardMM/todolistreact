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
    email: "",
    reEmail: "",
    oldCheckMail: "",
    showOldCheckMail: false,
    password: "",
    showPassword: false,
    rePassword: "",
    showRePassword: false,
    oldCheckPassword: "",
    showOldCheckPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault;
  };

  return (
    <div
      className="CreateUser"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {props.loggedIn && (
        <Typography variant="h3" component="div">
          Cannot create user while logged in
        </Typography>
      )}
      {!props.loggedIn && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" component="div">
            Profile
          </Typography>
          <Button variant="contained" onClick={() => console.log("Return")}>
            Return to home page
          </Button>
          <Typography variant="h6" component="div">
            Change mail
          </Typography>
          <FormControl variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              value={values.email}
              onChange={handleChange("email")}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="reEmail">Re-enter email</InputLabel>
            <Input
              id="reEmail"
              value={values.reEmail}
              onChange={handleChange("reEmail")}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="oldCheckMail">Old password</InputLabel>
            <Input
              id="oldCheckMail"
              type={values.showOldCheckMail ? "text" : "password"}
              value={values.oldCheckMail}
              onChange={handleChange("oldCheckMail")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle re-enter password visibility"
                    onClick={() =>
                      setValues({
                        ...values,
                        showOldCheckMail: !values.showOldCheckMail,
                      })
                    }
                    onMouseDown={() => handleMouseDownPassword}
                  >
                    {values.showOldCheckMail ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button variant="contained" onClick={() => console.log("Return")}>
            Save
          </Button>
          <Typography variant="h6" component="div">
            Change password
          </Typography>
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
                    onClick={() =>
                      setValues({
                        ...values,
                        showPassword: !values.showPassword,
                      })
                    }
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
                    onClick={() =>
                      setValues({
                        ...values,
                        showRePassword: !values.showRePassword,
                      })
                    }
                    onMouseDown={() => handleMouseDownPassword}
                  >
                    {values.showRePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="oldCheckPassword">Old Password</InputLabel>
            <Input
              id="oldCheckPassword"
              type={values.showOldCheckPassword ? "text" : "password"}
              value={values.oldCheckPassword}
              onChange={handleChange("oldCheckPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle re-enter password visibility"
                    onClick={() =>
                      setValues({
                        ...values,
                        showOldCheckPassword: !values.showOldCheckPassword,
                      })
                    }
                    onMouseDown={() => handleMouseDownPassword}
                  >
                    {values.showOldCheckPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button variant="contained" onClick={() => console.log("Create")}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
