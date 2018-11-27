import { call, put, takeEvery } from 'redux-saga/effects';

function playsSeen(views) {
  let playIds = views.map(v => {
    return v.play_id
  });
  let uniquePlayIds = playIds.filter((p, i) => {
    return playIds.indexOf(p) >= i;
  });
  return uniquePlayIds;
}

function* updateStats(action) {
  try {
    const all = action.payload;
    const allFilms = all.filter(v => v.medium === 'film');
    const exactFilms = allFilms.filter(v => !v.loose_adapt);
    const live = all.filter(v => v.medium === 'live');
    const playsSeenAll = playsSeen(all);
    const playsSeenLive = playsSeen(live);
    const stats = {
      all: all,
      allFilms: allFilms,
      exactFilms: exactFilms,
      live: live,
      playsSeenAll: playsSeenAll,
      playsSeenLive: playsSeenLive,
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