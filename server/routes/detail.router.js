const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get production detail for one production
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    const sqlText = `SELECT 
                    production.id AS production_id,
                    play_id, start_date, end_date, genre, alt_genre, medium,
                    play.title AS play_title,
                    live.theater AS theater,
                    live.location AS location,
                    live.image_url AS image_url,
                    live.url AS production_url,
                    film.title AS film_title,
                    film.loose_adapt AS loose_adapt,
                    film.poster_path AS poster_path,
                    film.release_date AS release_date,
                    film.tmdb_id AS tmdb_id
                FROM production 
                LEFT JOIN live ON id = live.production_id
                LEFT JOIN film ON id = film.production_id
                JOIN play ON play_id = play.id
                WHERE production.id=$1;`;
  pool.query(sqlText, [id])
  .then((result) => { res.send(result.rows); })
  .catch((err) => {
    console.log('Error completing SELECT production by id query', err);
    res.sendStatus(500);
  });
});

module.exports = router;

