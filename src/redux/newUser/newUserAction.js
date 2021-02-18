/* eslint-disable import/no-unresolved */
import {
  NEW_USER_REQUEST, NEW_USER_SUCCESS, NEW_USER_FAILED, USER_LOGOUT,
} from 'redux/newUser/newUserTypes';

export const newUserRequest = () => ({
  type: NEW_USER_REQUEST,
});

export const newUserSuccess = (user, token) => ({
  type: NEW_USER_SUCCESS,
  user,
  token,
});

export const newUserFailed = (error) => ({
  type: NEW_USER_FAILED,
  error,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});
