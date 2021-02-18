/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable quote-props */
/* eslint-disable react/prop-types */
import React from 'react';
import like from 'images/like.png';
import unlike from 'images/unlike.png';

const Like = ({ addLike, name, lengthLike }) => {
  const changeImg = name === 'like' ? unlike : like;

  return (
    <button type="button" className={`btn-like ${name}`} onClick={addLike}>
      <img src={changeImg} alt={name} />
      <p>{lengthLike}</p>
    </button>
  );
};

export default Like;
