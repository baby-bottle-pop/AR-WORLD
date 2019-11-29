import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
export default class Splash extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.loginNavigator();
    }, 3000);
  }
  render() {
    return (
      <View style={styles.welcome}>
        <Text>Welcome To AR WORLD</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F6D7A"
  }
});
