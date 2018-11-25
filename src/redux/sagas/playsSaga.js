import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPlays() {
    try {
        const response = yield axios.get('/api/play');
        yield put({ type: 'SET_PLAYS', payload: response.data });
      } catch (error) {
        console.log('Plays get request failed', error);
      }
}

function* playsSaga() {
    yield takeLatest('FETCH_PLAYS', fetchPlays);
  }

export default playsSaga;