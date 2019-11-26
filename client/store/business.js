import axios from 'axios';
require('../../secret');

const GET_ALL = 'GET_ALL';
const GET_REVIEWS = 'GET_REVIEWS';

const gettingAll = business => {
  return {
    type: GET_ALL,
    business,
  };
};

const getReview = reviews => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const initialState = {
  business: [],
  reviews: [],
};

export const gettingAllThunk = (lat, long, category) => async dispatch => {
  try {
    let categoryId;

    if (category === 'activity') {
      categoryId = '4d4b7104d754a06370d81259';
    } else if (category === 'food') {
      categoryId = '4d4b7105d754a06374d81259';
    } else if (category === 'bars') {
      categoryId = '4bf58dd8d48988d116941735';
    }

    const data = await fetch(
      `https://api.foursquare.com/v2/venues/search/?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20180323&limit=15&ll=${lat},${long}&radius=500&categoryId=${categoryId}`
    );
    const placesData = await data.json();
    console.log(placesData);
    const venues = placesData.response.venues;
    dispatch(gettingAll(venues));
  } catch (error) {
    console.error(error);
  }
};

export const getReviewsThunk = id => async dispatch => {
  try {
    const data = await fetch(
      `https://api.foursquare.com/v2/venues/4a9ff5d9f964a520ba3d20e3/tips?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&v=20190323&sort=popular`
    );
    const item = await data.json();
    console.log('ITEM', item);
    const reviews = item.response.tips.items;
    console.log(reviews);
    dispatch(getReview(reviews));
  } catch (error) {
    console.log(error);
  }
};

export default function businessReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        business: action.business,
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };
    default:
      return state;
  }
}
