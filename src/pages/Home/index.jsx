/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import React from 'react';
import SendMessage from 'components/SendMessage';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state);

  return (
    <div>
      <h1>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</h1>
      {user.isAuthenticated && <SendMessage />}
    </div>
  );
};

export default Home;
