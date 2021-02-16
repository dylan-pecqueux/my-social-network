/* eslint-disable quote-props */
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const Profil = () => {
  const [fetchValue, setFetchValue] = useState(false);
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
      });
  };
  React.useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
      {!fetchValue && <h3>Loading...</h3>}
      {fetchValue && (
        <div>
          <h1>Mon profil :</h1>
          <h2>{fetchValue.email}</h2>
          <h2>{fetchValue.username}</h2>
          <p>{fetchValue.description}</p>
        </div>
      )}
    </div>
  );
};

export default Profil;
