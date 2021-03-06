/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quote-props */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserPost from 'components/UserPost';

const User = () => {
  const { username } = useParams();
  const connectedUser = useSelector((state) => state);
  const [fetchValue, setFetchValue] = useState('');

  const fetchUserProfil = () => {
    fetch(`http://localhost:1337/users?slug=${username}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${connectedUser.token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((response) => {
        console.log(response);
        setFetchValue(response[0]);
      });
  };

  useEffect(() => {
    fetchUserProfil();
  }, []);
  
  return (
    <div className="user">
      {!fetchValue && <h3>Loading...</h3>}
      {fetchValue && (
        <>
          <h1>
            Profil de : <span>{fetchValue.username}</span>
          </h1>
          <h3>Description :</h3>
          <p>{fetchValue.description}</p>
          <div>
            <h2>Posts :</h2>
            <UserPost id={fetchValue.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default User;
