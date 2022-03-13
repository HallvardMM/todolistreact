import { makeAutoObservable } from "mobx";

class Authentication {
  user = "";
  loggedIn = false;
  admin = false;

  constructor() {
    makeAutoObservable(this);
  }

  login(username, admin) {
    this.user = username;
    this.admin = admin;
    this.loggedIn = true;
  }

  logout() {
    this.user = "";
    this.admin = false;
    this.loggedIn = false;
  }
}

const Auth = new Authentication();

export default Auth;
