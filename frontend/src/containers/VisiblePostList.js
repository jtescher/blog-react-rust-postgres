import { connect } from 'react-redux';
import { togglePostPublished, VisibilityFilters } from '../actions';
import PostList from '../components/PostList';

const getVisiblePosts = (posts, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return posts;
    case VisibilityFilters.SHOW_PUBLISHED:
      return posts.filter(p => p.published);
    case VisibilityFilters.SHOW_DRAFTS:
      return posts.filter(p => !p.published);
    default:
      return posts;
  }
};

const mapStateToProps = (state) => {
  return {
    posts: getVisiblePosts(state.posts, state.visibilityFilter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostClick: (id) => {
      dispatch(togglePostPublished(id));
    }
  };
};

const VisiblePostList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);

export default VisiblePostList;
