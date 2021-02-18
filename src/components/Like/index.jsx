/* eslint-disable quote-props */
/* eslint-disable react/prop-types */
import React from 'react';

const Like = ({ addLike, name }) => (
  <button type="button" onClick={addLike}>{name}</button>
);

export default Like;
