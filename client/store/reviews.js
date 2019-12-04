import axios from "axios";

const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
const GOT_REVIEWS = "GOT_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";

const allReviews = reviews => ({ type: GET_ALL_REVIEWS, reviews });

const gotReviews = reviews => ({ type: GOT_REVIEWS, reviews });

const addReview = review => ({ type: ADD_REVIEW, review });

const initialState = {
  reviews: [],
  review: {}
};

export const allReviewsThunk = () => async dispatch => {
  try {
    const { data } = await axios.get(
      "https://ar-server-v2.herokuapp.com/api/reviews/"
    );
    dispatch(allReviews(data));
  } catch (error) {
    console.log(error);
  }
};

// put your computer's ip into here
export const getReviewsThunk = id => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://ar-server-v2.herokuapp.com/api/reviews/${id}`
    );
    dispatch(gotReviews(data));
  } catch (error) {
    console.log(error);
  }
};

export const addReviewThunk = (id, content, ratings) => async dispatch => {
  try {
    ratings = +ratings;
    const { data } = await axios.post(
      `https://ar-server-v2.herokuapp.com/api/reviews/${id}`,
      {
        content,
        ratings
      }
    );
    dispatch(addReview(data));
  } catch (error) {}
};

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return { ...state, reviews: action.reviews };
    case GOT_REVIEWS:
      return { ...state, reviews: action.reviews };
    case ADD_REVIEW:
      return { ...state, review: action.review };
    default:
      return state;
  }
}
