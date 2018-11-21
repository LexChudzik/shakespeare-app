import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* searchMovies(action) {
    try {
      const response = yield call( axios.post, '/api/tmdb', action.payload);
      yield put( {type: 'SET_RESULTS', payload: response.data} );
    }
    catch (error) {
      console.log('error with giphy search', error);
    }
  }
  
  function* saveMovie(action) {
    try {
      yield call( axios.post, '/api/tmdb', action.payload);
      //yield put( {type: 'SET_RESULTS', payload: response.data} );
    }
    catch (error) {
      console.log('error with giphy search', error);
    }
  }

function* filmSaga() {
    yield takeEvery( 'SEND_SAVE', saveMovie );
    yield takeEvery( 'SEARCH_MOVIES',  searchMovies);
}

export default filmSaga;