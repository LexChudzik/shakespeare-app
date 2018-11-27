const listReducer = (state = [], action) =>{
    if (action.type === 'SET_LIST') {
        return action.payload;
    }
    return state;
}

  // user will be on the redux state at:
  // state.list
export default listReducer;