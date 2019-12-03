import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Button } from 'react-native';
import { addReviewThunk } from '../client/store/reviews';
import { connect } from 'react-redux';

class AddReview extends Component {
  constructor(props) {
    super();
    this.state = {
      content: '',
      ratings: '',
    };
  }

  render() {
    return (
      <View style={styles.input}>
        <TextInput
          value={this.state.content}
          onChangeText={text => this.setState({ content: text })}
          placeholder={'Comment'}
          placeholderTextColor="black"
        />
        <TextInput
          value={this.state.ratings}
          onChangeText={text => this.setState({ ratings: text })}
          placeholder={'Rating (number btwn 1-5)'}
          placeholderTextColor="black"
        />
        <Button
          title="SUBMIT"
          onPress={() =>
            this.props.addReviewThunk(
              this.props.id,
              this.state.content,
              this.state.ratings
            )
          }
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

const mapStateToProps = state => ({
  id: state.businessReducer.id,
});

const mapDispatchToProps = dispatch => ({
  addReviewThunk: (id, content, ratings) =>
    dispatch(addReviewThunk(id, content, ratings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
