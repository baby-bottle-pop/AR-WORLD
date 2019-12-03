import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ViroFlexView, ViroText, ViroImage } from 'react-viro';
import { connect } from 'react-redux';
import { getDetailsThunk } from '../client/store/business';
import Reviews from './Reviews';

class Details extends Component {
  constructor(props) {
    super();
    this.state = { clicked: false };
  }

  componentDidMount() {
    this.props.getDetailsThunk(this.props.id);
  }

  render() {
    let allDetails = this.props.details;
    console.log(allDetails);
    let details = allDetails.filter(detail => {
      console.log('store', detail);
      console.log('id', this.props.id);
      return detail.venue.id === this.props.id;
    });
    let venue;
    if (details.length) {
      console.log('the details', details[0].venue);
      venue = details[0].venue;
      console.log(venue);
    }

    let description;
    let address;
    let rating;
    let phone;
    let hours;
    let review;

    if (venue) {
      if (venue.description) {
        description = venue.description;
      } else if (venue.page) {
        description = venue.page.pageInfo.description;
      } else {
        description = 'No Description Available';
      }
      address = venue.location
        ? venue.location.formattedAddress
        : 'No address available';
      rating = venue.rating ? venue.rating : 'No Ratings';
      phone = venue.formattedPhone
        ? venue.formattedPhone
        : 'No phone number Available';
      hours = venue.hours ? venue.hours.status : 'No Hours Available';
      review = venue.tips.groups[0].items[0]
        ? venue.tips.groups[0].items[0].text
        : 'No Reviews Yet';
    } else {
      description =
        'loremcwemcniqebrvibeqkvnwelvnlnvlnelvnloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvloremcwemcniqebrvibeqkvnwelvnlnvlnelvabvcwks';

      address = 'ASIA';
      rating = 10;
      phone = '1213143414';
      hours = 'open till 7pm';
      review = 'best place ever';
    }

    // console.log("description", this.props.details.page.pageInfo.description);
    // console.log("location", this.props.details.location); // .lat,.lng, .formattedAddress[0]
    // console.log("name", this.props.details.name);
    // console.log("phone", this.props.details.formattedPhone);
    // console.log("rating", this.props.details.rating);
    // console.log("hours", this.props.details.hours.timeframes); // is an array timeframes[i].days, and .open[0].renderedTime
    // console.log("review", this.props.details.tips.groups[0].items[0].text); // a random review
    // {
    //   this.props.details.venue
    //     ? console.log(this.props.details.venue.location)
    //     : console.log("broken");
    // }
    return (
      <ViroFlexView
        backgroundColor="white"
        style={{
          flex: 0.8,
          marginTop: '10%',
        }}
        opacity={0.85}
      >
        <ViroFlexView style={{ flex: 0.2 }}>
          <ViroText style={styles.descriptionReviews} text="Description" />
          <ViroText style={styles.info} text={`${description}`} />
        </ViroFlexView>
        <ViroFlexView
          style={{
            flex: 0.2,
            flexDirection: 'row',
            marginTop: '10%',
          }}
        >
          <ViroFlexView style={{ flex: 0.5, flexDirection: 'column' }}>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText style={styles.subHeadings} text="Address" />
              <ViroText style={styles.info} text={`${address}`} />
            </ViroFlexView>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText style={styles.subHeadings} text="Rating" />
              <ViroText style={styles.info} text={`${rating}`} />
            </ViroFlexView>
          </ViroFlexView>
          <ViroFlexView style={{ flex: 0.5, flexDirection: 'column' }}>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText style={styles.subHeadings} text="Phone Number" />
              <ViroText style={styles.info} text={`${phone}`} />
            </ViroFlexView>
            <ViroFlexView style={{ flex: 0.5 }}>
              <ViroText style={styles.subHeadings} text="Hours" />
              <ViroText style={styles.info} text={`${hours}`} />
            </ViroFlexView>
          </ViroFlexView>
        </ViroFlexView>
        <ViroFlexView style={{ flex: 0.2 }}>
          <ViroText style={styles.descriptionReviews} text="Review" />
          <ViroText style={styles.info} text={`${review}`} />
        </ViroFlexView>
        <ViroImage
          style={{ flex: 0.2, marginLeft: '35%' }}
          width={2}
          source={require('../js/res/reviews.png')}
          onClick={() => {
            this.props.addReview();
            console.log('yay');
          }}
        />
        <Reviews />
      </ViroFlexView>
    );
  }
}
const mapStateToProps = state => ({ details: state.businessReducer.details });
const mapDispatchToProps = dispatch => ({
  getDetailsThunk: id => dispatch(getDetailsThunk(id)),
});

const styles = StyleSheet.create({
  subHeadings: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: '#b22222',
  },
  descriptionReviews: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: '#b22222',
    flex: 0.4,
    marginTop: '10%',
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    alignItems: 'flex-start',
    color: '#0000cd',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
