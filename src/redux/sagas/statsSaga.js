import { call, put, takeEvery } from 'redux-saga/effects';

function* updateStats(action) {
  try {
    const all = action.payload;
    const allFilms = all.filter(v => v.medium === 'film');
    const exactFilms = allFilms.filter(v => !v.loose_adapt);
    const live = all.filter(v => v.medium === 'live');
    const comedy = all.filter(v => v.genre === 'c')
    const stats = {
      allCount: all.length,
      allFilmsCount: allFilms.length,
      exactFilmsCount: exactFilms.length,
      liveCount: live.length,
    };

  yield put( {type: 'SET_STATS', payload: stats } );
  }
  catch (error) {
    console.log('error with calculating stats', error);
  }
}

function* statsSaga() {
  yield takeEvery( 'UPDATE_STATS',  updateStats);
}

export default statsSaga;