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
    console.log(data);
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
          dispatch(newUserSuccess(response.user.id));
          console.log(response);
          Cookies.set('token', response.jwt);
          Cookies.set('id', response.user.id);
          history.replace('/');
        }
      }).catch((error) => console.error('Error: ', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email :
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password :
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
      {user.loading && <h3>loading...</h3>}
      {user.error && (
      <h3>
        une erreur est survenue
        {user.error}
      </h3>
      )}
      {user.isAuthenticated && <Redirect to="/" />}
    </div>
  );
};

export default Login;
