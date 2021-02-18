/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'App';
import store from './redux/store';
import 'index.scss';

const Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));
