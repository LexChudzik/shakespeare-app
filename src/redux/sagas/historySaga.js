import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchHistory(action) {
    try {
        console.log(action);
        
      const response = yield call( axios.get, `/api/history/${action.payload.id}`);
      yield put( {type: 'SET_HISTORY', payload: response.data} );
    }
    catch (error) {
      console.log('error with getting user history search', error);
    }
}

function* historySaga() {
    yield takeEvery( 'FETCH_HISTORY',  fetchHistory);
}

export default historySaga;