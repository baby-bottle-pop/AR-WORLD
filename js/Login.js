import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { loginThunk } from "../client/store/user";

class Login extends Component {
  constructor(props) {
    super();
    this.state = { email: "", password: "" };
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
      <View style={styles.login}>
        <View style={styles.container}>
          <Text style={styles.welcome}>{`WELCOME TO\n AR World`}</Text>
          <View style={{ height: 30 }} />
          <View style={styles.emailContainer}>
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
            onPress={() => {
              this.props.login(this.state.email, this.state.password);
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.signup}>
          <View style={styles.normalContainer}>
            <Text style={styles.normalText}>Do not have account?</Text>
          </View>
          <TouchableOpacity onPress={this.props.SignUpNavigator}>
            <View style={styles.createAccount}>
              <Text style={styles.createText}>Create New Account</Text>
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
  login: {
    flex: 1
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 50
  },
  createAccount: {
    height: 25
  },
  normalContainer: {
    height: 25
  },
  normalText: {
    color: "#5B5A5A",
    fontSize: 12,
    alignItems: "center",
    textAlign: "center",
    width: 330
  },
  createText: {
    color: "#FF7260",
    fontSize: 14,
    alignItems: "center",
    textAlign: "center",
    width: 330
  },
  welcome: {
    fontSize: 30,
    color: "#5B5A5A",
    textAlign: "center",
    letterSpacing: 5
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
  emailContainer: {
    width: 325,
    borderColor: "#CFD0D1",
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: "#F5F6F7"
  },
  passwordContainer: {
    width: 325,
    borderColor: "#CFD0D1",
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#F5F6F7"
  },
  signup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%"
  }
});

const mapStateToProps = state => {
  return { isLoggedIn: !!state.userReducer.user.email };
};

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginThunk(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
