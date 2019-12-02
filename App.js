import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./client/store";

import Login from "./js/Login";
import ARWorld from "./js/ARWorld";
import Splash from "./js/Splash";

let SPLASH = "SPLASH";
let AR = "AR";
let LOGIN = "LOGIN";
console.disableYellowBox = true;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // navigatorType: "SPLASH"
      navigatorType: "AR"
    };
    this.LoginNavigator = this.LoginNavigator.bind(this);
    this.ARNavigator = this.ARNavigator.bind(this);
  }
  render() {
    return (
      <Provider store={store}>
        {this.state.navigatorType === SPLASH ? (
          <Splash loginNavigator={this.LoginNavigator} />
        ) : this.state.navigatorType === LOGIN ? (
          <Login ARNavigator={this.ARNavigator} />
        ) : (
          <ARWorld />
        )}
      </Provider>
    );
  }
  LoginNavigator() {
    this.setState({ navigatorType: LOGIN });
  }
  ARNavigator() {
    this.setState({ navigatorType: AR });
  }
}

module.exports = App;
