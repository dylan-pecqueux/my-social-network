/* eslint-disable import/no-unresolved */
/* eslint-disable no-unneeded-ternary */
import {
  NEW_USER_REQUEST, NEW_USER_SUCCESS, NEW_USER_FAILED, USER_LOGOUT,
} from 'redux/newUser/newUserTypes';
import Cookies from 'js-cookie';

const initialState = {
  loading: false,
  isAuthenticated: Cookies.get('token') ? true : false,
  user: Cookies.get('id'),
  token: Cookies.get('token'),
  error: '',
};

const newUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.user,
        token: action.token,
      };
    case NEW_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        isAuthenticated: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: undefined,
        token: undefined,
      };
    default:
      return state;
  }
};

export default newUserReducer;
