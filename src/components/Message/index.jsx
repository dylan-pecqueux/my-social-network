/* eslint-disable eqeqeq */
/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import Like from 'components/Like';
import Delete from 'components/Delete';
import { useSelector } from 'react-redux';

const Message = ({
  username, text, like, id, postId, isLiked, changeLike, changeIsDeleted,
}) => {
  const user = useSelector((state) => state);
  const alreadyLiked = like.filter((element) => element.id == user.user);
  const dislike = like.filter((element) => element.id != user.user);
  const btnName = alreadyLiked[0] ? 'unlike' : 'like';

  const addLike = () => {
    const data = {
      likes: alreadyLiked[0] ? dislike : [...like, user.user],
    };
    fetch(`http://localhost:1337/posts/${postId}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())
      .then(() => {
        changeLike();
      });
  };

  return (
    <li className="message">
      <Link to={`/user/${username}`}>{username}</Link>
      <p>{text}</p>
      <div>
        <Like addLike={addLike} isLiked={isLiked} name={btnName} lengthLike={like.length} />
        {user.user == id && <Delete postId={postId} changeIsDeleted={changeIsDeleted} />}
      </div>
    </li>
  );
};

export default Message;
