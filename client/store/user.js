import axios from "axios";

const GOT_USER = "GET_USER";

const gotUser = user => {
  return {
    type: GOT_USER,
    user
  };
};

const initialState = {
  user: {}
};

export const loginThunk = (email, password) => async dispatch => {
  try {
    let res = await axios.post(`http://192.168.1.120:8080/auth/login`, {
      //put your comp ip address
      email,
      password
    });

    dispatch(gotUser(res.data));
  } catch (error) {
    return dispatch(gotUser({ error }));
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { user: action.user };
    default:
      return state;
  }
};

export default userReducer;
