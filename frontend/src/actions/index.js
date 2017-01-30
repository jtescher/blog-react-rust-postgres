// TODO remove horrible global mutable state... >:(
let nextPostId = 0;

export const ADD_POST = 'ADD_POST';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_POST_PUBLISHED = 'TOGGLE_POST_PUBLISHED';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_PUBLISHED: 'SHOW_PUBLISHED',
  SHOW_DRAFTS: 'SHOW_DRAFTS'
}

export const addPost = (title, body) => {
  return {
    type: ADD_POST,
    id: nextPostId++,
    title,
    body
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
};

export const togglePostPublished = (id) => {
  return {
    type: TOGGLE_POST_PUBLISHED,
    id
  };
};
