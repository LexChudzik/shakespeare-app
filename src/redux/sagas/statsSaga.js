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

function duplicatesArray(viewList) {
  let byPlay = {};
  for (let i = 0; i < viewList.length; i++) {
    const play_id = JSON.stringify(viewList[i].play_title);
    if (!byPlay[play_id]) {
      byPlay[play_id] = [];
    }
    byPlay[play_id].push(viewList[i]);
  }
  console.log(byPlay);
  let result = Object.keys(byPlay).map(key => {
    return {title: eval(key), number: byPlay[key].length }
  });
  result = result.filter(p => (p.number > 1))
  result.sort(function(a, b){
    return b.number-a.number
  })
  return result;
}

function* updateStats(action) {
  try {
    const seen = action.payload.filter(p => p.viewing_id);
    const seenLive = seen.filter(p => p.medium === 'live');
    const liveDuplicates = duplicatesArray(seenLive);
    const allDuplicates = duplicatesArray(seen);
    // const allFilms = all.filter(v => v.medium === 'film');
    // const noLoose = all.filter(v => !v.loose_adapt);
    // const live = all.filter(v => v.medium === 'live');
    const playsSeen = findPlaysSeen(seen);
    const playsSeenLive = findPlaysSeen(seenLive);
    const tSeen = findPlaysSeen(seen.filter(p => p.genre === 't'));
    const cSeen = findPlaysSeen(seen.filter(p => p.genre === 'c'));
    const hSeen = findPlaysSeen(seen.filter(p => p.genre === 'h'));
    const stats = {
      seen: seen,     //array of every view
      seenLive: seenLive, //array of all live views
      playsSeen: playsSeen,  //array of plays seen
      playsSeenLive: playsSeenLive,  //array of plays seen live
      allDuplicates: allDuplicates, //array of arrays grouped by play
      liveDuplicates: liveDuplicates, // array of arrays grouped by play seen live only
      tSeen: tSeen,
      cSeen: cSeen,
      hSeen: hSeen,
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