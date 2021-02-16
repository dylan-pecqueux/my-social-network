/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { userLogout } from 'redux/newUser/newUserAction';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(userLogout());
    Cookies.remove('token');
    history.replace('/login');
  };

  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <button type="button" onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
