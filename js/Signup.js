import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity
} from "react-native";
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
      <View style={styles.enter}>
        <TouchableOpacity onPress={this.props.ARNavigator}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>ENTER WORLD</Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.signup}>
        <View style={styles.container}>
          <Text style={styles.welcome}>{`WELCOME TO\n AR World`}</Text>
          <View style={{ height: 30 }} />
          <View style={styles.firstContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="First Name"
              placeholderTextColor="#989899"
              onChangeText={text => this.setState({ firstName: text })}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              placeholderTextColor="#989899"
              onChangeText={text => this.setState({ lastName: text })}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="#989899"
              onChangeText={text => this.setState({ email: text })}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ password: text })}
              placeholder="Password"
              placeholderTextColor="#989899"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.signup(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName
              )
            }
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.goback}>
          <TouchableOpacity onPress={this.props.loginNavigator}>
            <View style={{ height: 25 }}>
              <Text style={styles.backText}>Back to Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  enter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  signup: {
    flex: 1
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 50
  },
  welcome: {
    fontSize: 30,
    color: "#5B5A5A",
    textAlign: "center",
    letterSpacing: 5
  },
  firstContainer: {
    width: 325,
    borderColor: "#CFD0D1",
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: "#F5F6F7"
  },
  inputContainer: {
    width: 325,
    borderColor: "#CFD0D1",
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderBottomWidth: 0,
    backgroundColor: "#F5F6F7"
  },
  passwordContainer: {
    width: 325,
    borderColor: "#CFD0D1",
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#F5F6F7"
  },
  textInput: {
    color: "black",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14
  },
  button: {
    width: 325,
    borderColor: "#129793",
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderRadius: 24,
    marginTop: 40,
    backgroundColor: "#129793",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  goback: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "40%",
    color: "black"
  },
  backText: {
    color: "black",
    fontSize: 14,
    alignItems: "center",
    textAlign: "center",
    width: 330
  }
});

const mapStateToProps = state => {
  return { isLoggedIn: !!state.userReducer.user.email };
};

const mapDispatchToProps = dispatch => ({
  signup: (email, password, firstName, lastName) =>
    dispatch(signUpThunk(email, password, firstName, lastName)),
  login: (email, password) => dispatch(loginThunk(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
