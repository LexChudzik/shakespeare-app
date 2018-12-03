import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchUserHistory(action) {
    try {
      const response = yield call( axios.get, `/api/history/${action.payload.id}`);
      yield put( {type: 'SET_HISTORY', payload: response.data} );
    }
    catch (error) {
      console.log('error with history get search', error);
    }
}

function* filmSaga() {
    yield takeEvery( 'FETCH_HISTORY',  fetchUserHistory);
}

export default filmSaga;