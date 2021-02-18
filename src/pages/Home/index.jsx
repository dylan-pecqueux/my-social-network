/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import React from 'react';
import SendMessage from 'components/SendMessage';
import PublicMessages from 'components/PublicMessages';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state);

  return (
    <>
      {user.isAuthenticated && (
        <div className="send-message">
          <SendMessage />
        </div>
      )}
      {!user.isAuthenticated && (
        <div className="home">
          <h1>Bienvenue sur My Social Network. Ce site est une entraînement à Redux et React. Nous utilisons auth et le routing pour créer un petit réseaux social.</h1>
          <PublicMessages />
        </div>
      )}
    </>
  );
};

export default Home;
