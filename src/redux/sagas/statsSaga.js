import { put, takeEvery } from 'redux-saga/effects';

function findPlaysSeen(views) {
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
    const seen = action.payload.filter(p => p.viewing_id);
    const seenLive = seen.filter(p => p.medium === 'live');
    // const allFilms = all.filter(v => v.medium === 'film');
    // const noLoose = all.filter(v => !v.loose_adapt);
    // const live = all.filter(v => v.medium === 'live');
    const playsSeen = findPlaysSeen(seen);
    const playsSeenLive = findPlaysSeen(seenLive);
    const stats = {
      seen: seen,     //array of every view
      seenLive: seenLive, //array of all live views
      playsSeen: playsSeen,  //array of plays seen
      playsSeenLive: playsSeenLive  //array of plays seen live
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