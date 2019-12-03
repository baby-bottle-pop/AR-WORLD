import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ViroFlexView, ViroText } from 'react-viro';
import { allReviewsThunk } from '../client/store/reviews';
import { connect } from 'react-redux';

class Reviews extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.allReviewsThunk();
  }

  render() {
    return (
      <ViroFlexView style={{ flex: 0.2 }}>
        {this.props.reviews.map(review => {
          return <ViroText style={styles.info} text={review.content} />;
        })}
      </ViroFlexView>
    );
  }
}
const mapStateToProps = state => ({
  reviews: state.reviewReducer.reviews,
  businesses: state.businessReducer.business,
});
const mapDispatchToProps = dispatch => ({
  allReviewsThunk: () => dispatch(allReviewsThunk()),
});

const styles = StyleSheet.create({
  subHeadings: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: '#b22222',
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    alignItems: 'flex-start',
    color: '#0000cd',
    textAlign: 'center',
    marginTop: '2%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
