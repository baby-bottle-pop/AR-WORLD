import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight
} from "react-native";
import { addReviewThunk } from "../client/store/reviews";
import { connect } from "react-redux";

class AddReview extends Component {
  constructor(props) {
    super();
    this.state = {
      content: "",
      ratings: "1"
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.input} behavior="padding" enabled>
          <View style={styles.topbox}>
            <TouchableHighlight onPress={this.props.removeReviewBox}>
              <Text style={styles.remove}>X</Text>
            </TouchableHighlight>
          </View>
          <Image style={styles.image} source={require("./res/comment.png")} />
          <View style={styles.comment}>
            <TextInput
              placeholder="Leave A Comment..."
              placeholderTextColor="gray"
              multiline={true}
              value={this.state.content}
              onChangeText={text => this.setState({ content: text })}
              maxLength={150}
              style={styles.box}
            />
          </View>
          <View style={styles.ratings}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Give A Rating{" "}
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Click here to select a Rating",
                value: null,
                color: "black",
                fontSize: 18,
                textAlign: "center"
              }}
              style={styles.picker}
              onValueChange={value => this.setState({ ratings: value })}
              placeholderTextColor="black"
              items={[
                { label: "1 star", value: "1" },
                { label: "2 stars", value: "2" },
                { label: "3 stars", value: "3" },
                { label: "4 stars", value: "4" },
                { label: "5 stars", value: "5" }
              ]}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Button
              title="SUBMIT"
              style={{ marginTop: "10%" }}
              onPress={() => {
                this.props.addReviewThunk(
                  this.props.id,
                  this.state.content,
                  this.state.ratings
                );
                this.setState({ content: "", ratings: "" });
              }}
              color="#ffffff"
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

let styles = StyleSheet.create({
  input: {
    position: "absolute",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9EEEE",
    left: 22,
    height: 350,
    borderRadius: 25
  },
  remove: {
    fontSize: 24,
    textAlign: "right",
    fontWeight: "bold",
    right: 15
  },
  box: {
    fontSize: 18,
    height: "100%",
    width: 300,
    borderColor: "black",
    borderWidth: 1
  },
  topbox: {
    flex: 0.2,
    backgroundColor: "#33F9FF",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center"
  },
  image: {
    flex: 0.25,
    width: "25%",
    bottom: 40
  },
  comment: { bottom: 33, flex: 0.3, backgroundColor: "#F1F7F7" },
  ratings: { bottom: 15, flex: 0.2, flexDirection: "column" },
  button: { bottom: 18, flex: 0.12, backgroundColor: "#33F9FF" }
});

const mapStateToProps = state => ({
  id: state.businessReducer.id
});

const mapDispatchToProps = dispatch => ({
  addReviewThunk: (id, content, ratings) =>
    dispatch(addReviewThunk(id, content, ratings))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
