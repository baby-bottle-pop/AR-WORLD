import React, { Component } from "react";
import { ViroFlexView, ViroText } from "react-viro";
import { connect } from "react-redux";
import { getDetailsThunk } from "../client/store/business";

class Details extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    console.log("moiunted");
    this.props.getDetails(this.props.id);
  }

  render() {
    console.log(this.props.details);
    let description;
    if (this.props.details.venue) {
      if (this.props.details.venue.description) {
        description = this.props.details.venue.description;
      } else if (this.props.details.venue.page) {
        description = this.props.details.venue.page.pageInfo.description;
      } else {
        description = "No Description Available";
      }
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
      <ViroFlexView backgroundColor="black" style={{ flex: 0.8 }}>
        <ViroText style={{ color: "white" }} text={`${description}`} />
      </ViroFlexView>
    );
  }
}
const mapStateToProps = state => ({ details: state.businessReducer.details });
const mapDispatchToProps = dispatch => ({
  getDetails: id => dispatch(getDetailsThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
