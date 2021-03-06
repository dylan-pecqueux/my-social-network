/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { newUserRequest, newUserSuccess, newUserFailed } from 'redux/newUser/newUserAction';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newUserRequest());
    const data = {
      identifier: email,
      password,
    };
    fetch('http://localhost:1337/auth/local', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(newUserFailed(response.error));
        } else {
          dispatch(newUserSuccess(response.user.id, response.jwt));
          Cookies.set('token', response.jwt);
          Cookies.set('id', response.user.id);
          history.replace('/');
        }
      }).catch((error) => console.error('Error: ', error));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        {user.isAuthenticated && <Redirect to="/" />}
        {user.loading && <h3>loading...</h3>}
        {user.error && (
        <h3>
          une erreur est survenue
          {user.error}
        </h3>
        )}
        <div>
          <label> Email :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password : </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input className="btn-primary" type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default Login;
