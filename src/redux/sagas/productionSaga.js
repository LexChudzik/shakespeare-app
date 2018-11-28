import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* sendFilm(action) {
    try {
        const response = yield axios.post('/api/production/film', action.payload);
        yield put({ type: 'FETCH_PRODUCTION', payload: response.data[0].id });
      } catch (error) {
        console.log('add film error', error);
      }
}

function* fetchProduction(action) {
  try {
    const response = yield axios.get(`/api/production/${action.payload}`);
    yield put({ type: 'SET_PRODUCTION', payload: response.data});
  } catch (error) {
    console.log('get production error', error);
  }
}


function* fetchProductions(action) {
  try {
    const response = yield axios.get(`/api/production/${action.payload.id}`);
    yield put({ type: 'SET_PRODUCTIONS', payload: response.data});
  } catch (error) {
    console.log('get production error', error);
  }
}

function* productionSaga() {
    yield takeLatest('SEND_FILM', sendFilm);
    yield takeLatest( 'FETCH_PRODUCTION', fetchProduction);
    yield takeLatest( 'FETCH_PRODUCTIONS', fetchProductions);
  }

export default productionSaga;