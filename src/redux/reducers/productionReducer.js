const productionReducer = (state = [], action) =>{
  if (action.type === 'SET_PRODUCTIONS') {
      return action.payload;
  }
  return state;
}

  // user will be on the redux state at:
  // state.production
export default productionReducer;