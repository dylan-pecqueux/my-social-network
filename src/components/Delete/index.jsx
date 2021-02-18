/* eslint-disable quote-props */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

const Delete = ({ postId, changeIsDeleted }) => {
  const token = useSelector((state) => state.token);

  const fetchDelete = () => {
    fetch(`http://localhost:1337/posts/${postId}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response);
      changeIsDeleted();
    });
  };

  return (
    <button type="button" onClick={fetchDelete}>Delete</button>
  );
};

export default Delete;
