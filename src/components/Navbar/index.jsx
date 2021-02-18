/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { userLogout } from 'redux/newUser/newUserAction';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const logout = () => {
    dispatch(userLogout());
    Cookies.remove('token');
    Cookies.remove('id');
    history.replace('/login');
  };

  return (
    <nav>
      <Link className="home" to="/">My Social Network</Link>
      {!isAuthenticated && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <Link to="/profil">Mon profil</Link>
          <button type="button" onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
