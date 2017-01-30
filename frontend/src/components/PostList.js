import React, { PropTypes } from 'react';
import Post from './Post';

const PostList = ({ posts, onPostClick }) => (
  <div>
    <h4>Posts:</h4>
    <ul>
      {posts.map(post =>
        <Post
          key={post.id}
          {...post}
          onClick={() => onPostClick(post.id)}
        />
      )}
    </ul>
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    published: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onPostClick: PropTypes.func.isRequired
};

export default PostList;
