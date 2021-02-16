/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import SendedMessage from 'components/SendedMessage';
import ErrorMessage from 'components/ErrorMessage';

const SendMessage = () => {
  const [inputValue, setInputValue] = useState('');
  const [send, setSend] = useState(false);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user);
  const token = Cookies.get('token');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      text: inputValue,
      user: user.id,
    };
    fetch('http://localhost:1337/posts', {
      method: 'post',
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
      {send && <SendedMessage />}
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default SendMessage;
