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
          style={styles.box}
        />
        <TextInput
          value={this.state.ratings}
          onChangeText={text => this.setState({ ratings: text })}
          placeholder={'Rating (number btwn 1-5)'}
          placeholderTextColor="black"
          style={styles.box}
        />
        <Button
          title="SUBMIT"
          style={{ marginTop: '10%' }}
          onPress={() => {
            this.props.addReviewThunk(
              this.props.id,
              this.state.content,
              this.state.ratings
            );
            this.setState({ content: '', ratings: '' });
            this.props.removeReviewBox();
          }}
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
    position: 'absolute',
    marginTop: 250,
    width: '100%',
    marginLeft: 6,
    height: '30%',
  },
  box: {
    marginTop: '5%',
    fontSize: 24,
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
