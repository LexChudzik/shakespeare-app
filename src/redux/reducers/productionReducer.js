const productionReducer = (state = [], action) =>{
  if (action.type === 'SET_PRODUCTIONS') {
    const productions = action.payload
    console.log(productions);
    
    productions.forEach(p => {
      Object.keys(p).forEach((key) => (p[key] == null) && delete p[key]);
    });
    console.log(productions);
    
    return productions;
  }
  return state;
}

  // user will be on the redux state at:
  // state.production
export default productionReducer;