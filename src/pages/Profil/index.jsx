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
  const [error, setError] = useState(false);
  const [send, setSend] = useState(false);
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
  }, []);

  React.useEffect(() => {
    if (send) {
      fetchProfile();
    }
  }, [send]);

  const handleSubmit = (e) => {
    setSend(false);
    setError(false);
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
    <div className="profil">
      {error && <ErrorMessage />}
      {send && <UpdatedMessage />}
      {!fetchValue && <h3>Loading...</h3>}
      {fetchValue && (
        <>
          <h1>Mon profil :</h1>
          <div>
            <h3>Username :</h3>
            <p>{fetchValue.username}</p>
          </div>
          <div>
            <h3>Email :</h3>
            <p>{fetchValue.email}</p>
          </div>
          <div>
            <h3>Description :</h3>
            <p>{fetchValue.description}</p>
          </div>
          <UpdateProfile
            handleSubmit={handleSubmit}
            username={username}
            description={description}
            handleUsername={(e) => setUsername(e.target.value)}
            handleDescription={(e) => setDescription(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default Profil;
