/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./client/store";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";

import Login from "./js/Login";
import ARWorld from "./js/ARWorld";

let UNSET = "UNSET";
let AR_NAVIGATOR_TYPE = "AR";
let LOGIN = "Login";

export default class ViroSample extends Component {
  constructor() {
    super();
    this.state = {
      navigatorType: "Login"
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    // this._exitViro = this._exitViro.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this._getLoginNavigator = this._getLoginNavigator.bind(this);
    this.goToAR = this.goToAR.bind(this);
  }

  fetchOptions() {
    console.log("hello");
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType === AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType === LOGIN) {
      return this._getLoginNavigator();
    }
  }

  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={"#68a0ff"}
          >
            <Text style={localStyles.buttonText}>ENTER AR WORLD</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _getARNavigator() {
    return (
      <Provider store={store}>
        <ARWorld />
      </Provider>
    );
  }
  _getLoginNavigator() {
    return <Login goToAR={this.goToAR} />;
  }
  goToAR() {
    this.setState({
      navigatorType: "AR"
    });
  }

  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

let localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black"
  },
  imageIcon: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 25
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  buttonTwo: {
    alignItems: "center",
    padding: 20,
    marginEnd: 10,
    justifyContent: "space-between"
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

module.exports = ViroSample;
