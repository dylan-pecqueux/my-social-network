/* eslint-disable react/prop-types */
/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import PublicMessage from 'components/PublicMessage';
import uuid from 'react-uuid';

const PublicMessages = () => {
  const [fetchValue, setFetchValue] = useState('');

  const fetchAllMessages = () => {
    fetch('http://localhost:1337/posts?_sort=created_at:desc', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((response) => {
        setFetchValue(response);
      });
  };
  useEffect(() => {
    fetchAllMessages();
  }, []);

  return (
    <div>
      {!fetchValue && <h3>Loading...</h3>}
      {fetchValue && (
        <ul>
          {fetchValue.map((element) => (
            <PublicMessage
              key={uuid()}
              text={element.text}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicMessages;
