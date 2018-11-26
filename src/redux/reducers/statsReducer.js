const statsReducer = (state = [], action) =>{
    if (action.type === 'SET_STATS') {
        return action.payload;
    }
    return state;
}

  // user will be on the redux state at:
  // state.films
export default statsReducer;