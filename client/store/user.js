import axios from "axios";

const GOT_USER = "GET_USER";

const gotUser = user => {
  console.log("1", user);
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
    let res = await axios.post(`http://${ip}/auth/login`, {
      //put your comp ip address
      email,
      password
    });
    console.log("thunk", res.data);
    dispatch(gotUser(res.data));
  } catch (error) {
    console.log("ccsadsc", error);
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
