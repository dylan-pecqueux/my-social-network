/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from 'pages/Home';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Navbar from 'components/Navbar';
import Profil from 'pages/Profil';
import store from './redux/store';

const App = () => (
  <Router>
    <Provider store={store}>
      <main>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profil">
            <Profil />
          </Route>
        </Switch>
      </main>
    </Provider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
