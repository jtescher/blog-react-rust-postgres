import { combineReducers } from 'redux'
import posts from './posts'
import visibilityFilter from './visibilityFilter'

const blogApp = combineReducers({
  posts,
  visibilityFilter
});

export default blogApp;
