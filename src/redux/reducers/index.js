import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import plays from './playsReducer';
import films from './filmReducer';
import production from './productionReducer';
import stats from './statsReducer';
import userHistory from './historyReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  plays, //will have the array of all plays
  films, //stores search results from tmdb
  production, //will all productions
  stats, //store stats
  userHistory //stores history ordered by date
});

export default rootReducer;
