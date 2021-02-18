/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const UpdateProfile = ({
  handleSubmit, username, handleDescription, description, handleUsername,
}) => (
  <form onSubmit={handleSubmit}>
    <label>
      Username :
      <input type="text" name="setUsername" value={username} onChange={handleUsername} />
    </label>
    <label>
      Description :
      <input type="textArea" name="setDescription" value={description} onChange={handleDescription} />
    </label>
    <button type="submit">Envoyer</button>
  </form>
);

export default UpdateProfile;
