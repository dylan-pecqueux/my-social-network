/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable quote-props */
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import UpdatedMessage from 'components/UpdatedMessage';
import ErrorMessage from 'components/ErrorMessage';
import UpdateProfile from 'components/UpdateProfile';

const Profil = () => {
  const [fetchValue, setFetchValue] = useState(false);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [send, setSend] = useState('');
  const token = Cookies.get('token');
  const fetchProfile = () => {
    fetch('http://localhost:1337/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((response) => {
        setFetchValue(response);
        setUsername(response.username);
        setDescription(response.description);
      });
  };
  React.useEffect(() => {
    fetchProfile();
  }, [send]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      description,
    };
    fetch('http://localhost:1337/users/me', {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        setError(true);
        setSend(false);
      } else {
        setSend(true);
        setError(false);
      }
    });
  };

  return (
    <div>
      {error && <ErrorMessage />}
      {send && <UpdatedMessage />}
      {!fetchValue && <h3>Loading...</h3>}
      {fetchValue && (
        <div>
          <h1>Mon profil :</h1>
          <h2>{fetchValue.email}</h2>
          <h2>{fetchValue.username}</h2>
          <p>{fetchValue.description}</p>
          <UpdateProfile
            handleSubmit={handleSubmit}
            username={username}
            description={description}
            handleUsername={(e) => setUsername(e.target.value)}
            handleDescription={(e) => setDescription(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Profil;
