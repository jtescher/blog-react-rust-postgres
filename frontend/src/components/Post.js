import React, { PropTypes } from 'react';

const Post = ({ onClick, published, title, body }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: published ? 'line-through' : 'none'
    }}
  >
    title: {title}, body: {body}
  </li>
);

Post.propTypes = {
  onClick: PropTypes.func.isRequired,
  published: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default Post;
