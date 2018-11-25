const filmReducer = (state = [], action) =>{
    if (action.type === 'SET_TMDB_RESULTS') {
        return action.payload;
    }
    return state;
}

  // user will be on the redux state at:
  // state.films
export default filmReducer;