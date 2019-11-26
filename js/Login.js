import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

export default class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      userName: "",
      password: ""
    };
  }
  render() {
    return (
      <View style={styles.input}>
        <TextInput
          style={styles.username}
          placeholder="Username"
          placeholderTextColor="black"
          onChangeText={text => this.setState({ userName: text })}
        />
        <TextInput
          style={styles.password}
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={text => this.setState({ password: text })}
        />
        <Button title="Enter world" onPress={this.props.goToAR} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  input: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
