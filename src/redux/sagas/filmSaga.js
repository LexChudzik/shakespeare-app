import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* searchMovies(action) {
    try {
      const response = yield call( axios.post, '/api/tmdb', action.payload);
      yield put( {type: 'SET_TMDB_RESULTS', payload: response.data} );
    }
    catch (error) {
      console.log('error with tmdb search', error);
    }
}

function* filmSaga() {
    yield takeEvery( 'SEARCH_MOVIES',  searchMovies);
}

export default filmSaga;