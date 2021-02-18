/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quote-props */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserPost from 'components/UserPost';

const User = () => {
  const { id } = useParams();
  const connectedUser = useSelector((state) => state);
  const [fetchValue, setFetchValue] = useState('');

  const fetchUserProfil = () => {
    fetch(`http://localhost:1337/users/${id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${connectedUser.token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((response) => {
        setFetchValue(response);
      });
  };

  useEffect(() => {
    fetchUserProfil();
  }, []);
  
  return (
    <div>
      {!fetchValue && <h3>Loading...</h3>}
      {fetchValue && (
        <>
          <h2>
            Profil de : {fetchValue.username}
          </h2>
          <h3>Description :</h3>
          <p>{fetchValue.description}</p>
          <div>
            <h2>Posts :</h2>
            <UserPost id={id} />
          </div>
        </>
      )}
    </div>
  );
};

export default User;
