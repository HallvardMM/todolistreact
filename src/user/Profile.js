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
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";
import validateEmail from "../common/Email";
import Auth from "../state/Authentication";
import { fetchJson } from "../api/fetchJson";
import { observer } from "mobx-react-lite";

const Profile = observer((props) => {
  let authState = Auth;
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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault;
  };

  function changeEmail(email) {
    if (validateEmail(email)) {
      fetchJson(
        `/ToDoList/changeEmail/${authState.user}/${email}/${values.oldCheckMail}`
      ).then((data) => {
        console.log(data);
        if (data === undefined || !data.success) {
          setEmailError("Could not change email!");
        } else {
          setValues({
            ...values,
            email: "",
            reEmail: "",
            oldCheckMail: "",
            showOldCheckMail: false,
          }),
            setEmailError("");
        }
      });
    } else {
      setEmailError("Not valid email!");
    }
  }

  function changePassword(password) {
    console.log(password.length);
    if (password.length >= 10) {
      fetchJson(
        `/ToDoList/changePassword/${authState.user}/${password}/${values.oldCheckPassword}`
      ).then((data) => {
        if (data === undefined || !data.success) {
          setPasswordError("Could not change password!");
        } else {
          setValues({
            ...values,
            password: "",
            showPassword: false,
            rePassword: "",
            showRePassword: false,
            oldCheckPassword: "",
            showOldCheckPassword: false,
          }),
            setPasswordError("");
        }
      });
    } else {
      setPasswordError("Password needs to be 10 characters long!");
    }
  }

  return (
    <Header>
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
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/main")}
            >
              Return to home page
            </Button>
            <Typography variant="h6" component="div">
              Change mail
            </Typography>
            <FormControl error={emailError !== ""} variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                value={values.email}
                onChange={handleChange("email")}
              />
            </FormControl>
            <FormControl error={emailError !== ""} variant="standard">
              <InputLabel htmlFor="reEmail">Re-enter email</InputLabel>
              <Input
                id="reEmail"
                value={values.reEmail}
                onChange={handleChange("reEmail")}
              />
            </FormControl>
            <FormControl error={emailError !== ""} variant="standard">
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
              {emailError && (
                <FormHelperText id="email-error-text">
                  {emailError}
                </FormHelperText>
              )}
            </FormControl>
            <Button
              disabled={values.email !== values.reEmail}
              variant="contained"
              color="secondary"
              onClick={() => changeEmail(values.email)}
            >
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
                      {values.showRePassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
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
              {passwordError && (
                <FormHelperText id="email-error-text">
                  {passwordError}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              disabled={values.password !== values.rePassword}
              variant="contained"
              color="secondary"
              onClick={() => changePassword(values.password)}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </Header>
  );
});

export default Profile;
