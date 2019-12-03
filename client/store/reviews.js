import axios from "axios"

const GET_ALL = "GET_ALL"
const GOT_REVIEWS = "GOT_REVIEWS"

const allReviews = reviews => ({type : GET_ALL, reviews})

const gotReviews = reviews => ({type: GOT_REVIEWS, reviews})

const initialState = {
    reviews: []
}

export const allReviewsThunk = async dispatch => {
    try {
        const { data } = await axios.get('/api/reviews/')
        dispatch(allReviews(data))
    } catch (error) {
        console.log(error)
    }
}

// put your computer's ip into here
export const getReviewsThunk = id => async dispatch => {
    try {
        const { data } = await axios.get('/api/reviews/:id')
        dispatch(gotReviews(data))
    } catch (error) {
        console.log(error)
    }
}

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL:
            return {...state, reviews: action.reviews}
        case GOT_REVIEWS:
            return {...state, reviews: action.reviews}
            console.log(reviews)
        default:
            return state
    }
}

