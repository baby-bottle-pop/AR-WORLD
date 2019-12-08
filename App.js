import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./client/store";

import Login from "./js/Login";
import Signup from "./js/Signup";
import ARWorld from "./js/ARWorld";
import Splash from "./js/Splash";

let SPLASH = "SPLASH";
let AR = "AR";
let LOGIN = "LOGIN";
let SIGNUP = "SIGNUP";
// let GUEST = "GUEST";
console.disableYellowBox = true;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      navigatorType: "LOGIN"
      // navigatorType: "SIGNUP"
    };
    this.LoginNavigator = this.LoginNavigator.bind(this);
    this.SignUpNavigator = this.SignUpNavigator.bind(this);
    this.ARNavigator = this.ARNavigator.bind(this);
  }
  render() {
    return (
      <Provider store={store}>
        {this.state.navigatorType === SPLASH ? (
          <Splash loginNavigator={this.LoginNavigator} />
        ) : this.state.navigatorType === LOGIN ? (
          <Login
            ARNavigator={this.ARNavigator}
            SignUpNavigator={this.SignUpNavigator}
          />
        ) : this.state.navigatorType === SIGNUP ? (
          <Signup
            ARNavigator={this.ARNavigator}
            loginNavigator={this.LoginNavigator}
          />
        ) : (
          <ARWorld />
        )}
      </Provider>
    );
  }
  LoginNavigator() {
    this.setState({ navigatorType: LOGIN });
  }
  SignUpNavigator() {
    this.setState({ navigatorType: SIGNUP });
  }
  ARNavigator() {
    this.setState({ navigatorType: AR });
  }
}

module.exports = App;
