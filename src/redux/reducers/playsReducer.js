const playsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PLAYS':
          return action.payload
        default:
          return state;
      }
  };
  
  // user will be on the redux state at:
  // state.plays
  export default playsReducer;