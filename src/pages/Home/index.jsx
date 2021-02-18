/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import React from 'react';
import SendMessage from 'components/SendMessage';
import PublicMessages from 'components/PublicMessages';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state);

  return (
    <div>
      <h1>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</h1>
      {user.isAuthenticated && (
        <div>
          <SendMessage />
        </div>
      )}
      {!user.isAuthenticated && (
        <div>
          <PublicMessages />
        </div>
      )}
    </div>
  );
};

export default Home;
