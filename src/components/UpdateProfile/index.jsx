/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const UpdateProfile = ({
  handleSubmit, username, handleDescription, description, handleUsername,
}) => (
  <form onSubmit={handleSubmit}>
    <h2>Modifier le profil :</h2>
    <div>
      <label>Username :</label>
      <input type="text" name="setUsername" value={username} onChange={handleUsername} />
    </div>
    <div>
      <label>Description :</label>
      <input type="textArea" name="setDescription" value={description} onChange={handleDescription} />
    </div>
    <button className="btn-primary" type="submit">Envoyer</button>
  </form>
);

export default UpdateProfile;
