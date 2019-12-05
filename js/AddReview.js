import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  Text,
  Picker
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
      <View style={styles.input}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 20 }}>Leave A Comment: </Text>
          <TextInput
            multiline={true}
            value={this.state.content}
            onChangeText={text => this.setState({ content: text })}
            maxLength={150}
            style={styles.box}
          />
        </View>
        {/* <Picker
          selectedValue={this.state.ratings}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ ratings: itemValue })
          }
        >
          >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker> */}
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 20 }}>Give A Rating </Text>
          <TextInput
            value={this.state.ratings}
            onChangeText={text => this.setState({ ratings: text })}
            style={styles.box}
          />
        </View>

        <View style={{ backgroundColor: "#33F9FF" }}>
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
              this.props.removeReviewBox();
            }}
            color="#ffffff"
          />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  input: {
    position: "absolute",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    left: 6
  },
  box: {
    marginTop: 5,
    fontSize: 18,
    height: 90,
    width: 200,
    borderColor: "black",
    borderWidth: 1
  }
});

const mapStateToProps = state => ({
  id: state.businessReducer.id
});

const mapDispatchToProps = dispatch => ({
  addReviewThunk: (id, content, ratings) =>
    dispatch(addReviewThunk(id, content, ratings))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
