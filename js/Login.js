import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { loginThunk } from "../client/store/user";

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    return !this.props.isLoggedIn ? (
      <View style={styles.input}>
        <Button
          style={styles.button}
          color="black"
          title="Enter world"
          onPress={this.props.ARNavigator}
        />
      </View>
    ) : (
      <View style={styles.input}>
        <TextInput
          style={styles.username}
          placeholder="Email"
          placeholderTextColor="black"
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          style={styles.password}
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={text => this.setState({ password: text })}
        />
        <Button
          style={styles.button}
          color="black"
          title="Login"
          onPress={() =>
            this.props.login(this.state.email, this.state.password)
          }
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  input: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F6D7A"
  },
  username: {
    marginTop: "10%",
    width: "50%",
    height: "2%",
    backgroundColor: "white"
  },
  password: {
    marginTop: "10%",
    width: "50%",
    height: "2%",
    backgroundColor: "white"
  },
  button: {
    marginTop: "10%"
  }
});

const mapStateToProps = state => {
  return { isLoggedIn: !!state.userReducer.user.email };
};

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginThunk(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
