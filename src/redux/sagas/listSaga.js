import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchList(action) {
    try {
      const response = yield call( axios.get, `/api/list/${action.payload.id}`);
      yield put( {type: 'SET_LIST', payload: response.data} );
    }
    catch (error) {
      console.log('error with getting user history search', error);
    }
}

function* listSaga() {
    yield takeEvery( 'FETCH_LIST',  fetchList);
}

export default listSaga;