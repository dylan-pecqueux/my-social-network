/* eslint-disable react/prop-types */
/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
import Message from 'components/Message';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';

const UserPost = ({ id }) => {
  const [fecthValue, setFetchValue] = useState('');
  const token = useSelector((state) => state.token);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchUserPost = () => {
    fetch(`http://localhost:1337/posts?user.id=${id}`, {
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
    fetchUserPost();
  }, [isLiked, isDeleted]);

  const changeLike = () => {
    if (isLiked) setIsLiked(false);
    else setIsLiked(true);
  };

  const changeIsDeleted = () => {
    if (isDeleted) setIsDeleted(false);
    else setIsDeleted(true);
  };

  return (
    <>
      {!fecthValue && <h3>Loading...</h3>}
      <ul>
        {fecthValue && fecthValue.map((element) => (
          <Message
            key={uuid()}
            username={element.user.username}
            id={element.user.id}
            text={element.text}
            like={element.like}
            postId={element.id}
            isLiked={isLiked}
            changeLike={changeLike}
            changeIsDeleted={changeIsDeleted}
          />
        ))}
      </ul>
    </>
  );
};

export default UserPost;
