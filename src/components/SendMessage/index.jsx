/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import SendedMessage from 'components/SendedMessage';
import ErrorMessage from 'components/ErrorMessage';
import DisplayMessages from 'components/DisplayMessages';
import { useSelector } from 'react-redux';

const SendMessage = () => {
  const [inputValue, setInputValue] = useState('');
  const [send, setSend] = useState(false);
  const [error, setError] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const user = useSelector((state) => state);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(false);
    setError(false);
    setRefetch(false);
    const data = {
      text: inputValue,
      user: user.user,
    };
    fetch('http://localhost:1337/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        setError(true);
      } else {
        setSend(true);
        setRefetch(true);
        setInputValue('');
      }
    });
  };

  return (
    <>
      {error && <ErrorMessage />}
      {send && <SendedMessage />}
      <form onSubmit={handleSubmit}>
        <input placeholder="Quelque-chose à dire ?" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button className="btn btn-primary" type="submit">Envoyer</button>
      </form>
      <DisplayMessages send={refetch} />
    </>
  );
};

export default SendMessage;
