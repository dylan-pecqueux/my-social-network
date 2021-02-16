/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import newUserReducer from 'redux/newUser/newUserReducer';

const store = createStore(
  newUserReducer,
  compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

export default store;
