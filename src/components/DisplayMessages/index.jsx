/* eslint-disable react/prop-types */
/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import Message from 'components/Message';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';

const DisplayMessages = ({ send }) => {
  const token = useSelector((state) => state.token);
  const [fetchValue, setFetchValue] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchAllMessages = () => {
    fetch('http://localhost:1337/posts?_sort=created_at:desc', {
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

  useEffect(() => {
    if (send) {
      fetchAllMessages();
    }
  }, [send, isLiked, isDeleted]);

  const changeLike = () => {
    if (isLiked) setIsLiked(false);
    else setIsLiked(true);
  };

  const changeIsDeleted = () => {
    if (isDeleted) setIsDeleted(false);
    else setIsDeleted(true);
  };

  return (
    <div>
      {!fetchValue && <h3>Loading...</h3>}
      {fetchValue && token && (
        <ul>
          {fetchValue.map((element) => (
            <Message
              key={uuid()}
              username={element.user.username}
              id={element.user.id}
              text={element.text}
              like={element.likes}
              postId={element.id}
              isLiked={isLiked}
              changeLike={changeLike}
              changeIsDeleted={changeIsDeleted}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayMessages;
