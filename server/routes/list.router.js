const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get user's list
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sqlText = `SELECT 
                    list.id AS list_id,
                    list.production_id AS prduction_id,
                    play.title AS play_title,
                    film.title AS film_title,
                    medium, release_date, poster_path, loose_adapt, tmdb_id, location, 
                    start_date, end_date, url, image_url, theater, genre, alt_genre, play_id
                  FROM list 
                  JOIN production on production.id = list.production_id
                  LEFT JOIN film ON film.production_id = list.production_id
                  LEFT JOIN live ON live.production_id = list.production_id
                  JOIN play ON production.play_id = play.id
                  WHERE person_id=$1
                  ORDER BY list.id;`;
  pool.query(sqlText, [id])
  .then((result) => {
    res.send(result.rows); })
  .catch((err) => {
    console.log('Error completing SELECT list query', err);
    res.sendStatus(500);
  });
});

//add to list
router.post('/', (req, res) => {
  const l = req.body;
  const sqlText = `INSERT INTO list (production_id, person_id)
                    VALUES ($1, $2);`;
  pool.query(sqlText, [l.production_id, l.user])
  .then((result) => {
    res.sendStatus(200);})
  .catch((err) => {
    console.log('Error completing INSERT INTO list query', err);
    res.sendStatus(500);
  });
});

//remove from list
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sqlText = `DELETE FROM list WHERE id = $1;`;
  pool.query(sqlText, [id])
  .then((result) => {
    res.sendStatus(200); })
  .catch((err) => {
    console.log('Error completing DELETE FROM list query', err);
    res.sendStatus(500);
  });
})

module.exports = router;