/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable no-undef */
/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import User from 'pages/User';
import Home from 'pages/Home';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Navbar from 'components/Navbar';
import Profil from 'pages/Profil';

const App = () => {
  const userConnected = useSelector((state) => state.isAuthenticated);
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      userConnected ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    )}
    />
  );

  return (
    <Router>
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
          <PrivateRoute path="/profil" component={Profil} />
          <PrivateRoute path="/user/:username" component={User} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
