const historyReducer = (state = [], action) =>{
    if (action.type === 'SET_HISTORY') {
        return action.payload;
    }
    return state;
}

  // user will be on the redux state at:
  // state.history
export default historyReducer;