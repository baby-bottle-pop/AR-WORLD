import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { loginThunk, signUpThunk } from "../client/store/user";

class Signup extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  }
  render() {
    return this.props.isLoggedIn ? (
        <View style={styles.input}>
          <Button
            style={styles.button}
            color="black"
            title="Enter world"
            onPress={this.props.ARNavigator}
          />
        </View>
      ):
      ( 
      <View style={styles.input}>
        <TextInput
          style={styles.username}
          placeholder="Email"
          placeholderTextColor="black"
          defaultValue="test@gmail.com"
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          style={styles.password}
          placeholder="Password"
          placeholderTextColor="black"
          defaultValue="123"
          onChangeText={text => this.setState({ password: text })}
        />
        <TextInput
          style={styles.firstName}
          placeholder="First Name"
          placeholderTextColor="black"
          defaultValue="Phurb"
          onChangeText={text => this.setState({ firstName: text })}
        />
        <TextInput
          style={styles.lastName}
          placeholder="Last Name"
          placeholderTextColor="black"
          defaultValue="Park"
          onChangeText={text => this.setState({ lastName: text })}
        />
        <Button
          style={styles.button}
          color="black"
          title="Signup"
          onPress={() =>
            this.props.signup(this.state.email, this.state.password, this.state.firstName, this.state.lastName)
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
  firstName: {
    marginTop: "10%",
    width: "50%",
    height: "2%",
    backgroundColor: "white"
  },
  lastName: {
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
  signup: (email, password, firstName, lastName) => dispatch(signUpThunk(email, password, firstName, lastName)),
  login: (email, password) => dispatch(loginThunk(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
