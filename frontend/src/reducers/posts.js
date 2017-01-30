import { ADD_POST, TOGGLE_POST_PUBLISHED } from '../actions/index'

const post = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        id: action.id,
        title: action.title,
        body: action.body,
        published: false
      };
    case TOGGLE_POST_PUBLISHED:
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        published: !state.published
      });
    default:
      return state;
  }
};

const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        post(undefined, action)
      ];
    case TOGGLE_POST_PUBLISHED:
      return state.map(p =>
        post(p, action)
      );
    default:
      return state;
  }
};

export default posts;
