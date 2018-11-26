const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get all productions
router.get('/', (req, res) => {
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
                  JOIN play ON play_id = play.id;`;
  pool.query(sqlText)
  .then((result) => { res.send(result.rows); })
  .catch((err) => {
    console.log('Error completing SELECT production query', err);
    res.sendStatus(500);
  });
});

//get production detail for one production
router.get('/:id', (req, res) => {
    const id = req.params.id;
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

//add live production
router.post('/live', (req, res) => {
  const p = req.body;
  //delete properties with blank strings from object
  Object.keys(p).forEach((key) => (p[key] === '') && delete p[key]);
  const sqlText = `WITH ins_1 AS (
      INSERT INTO production (play_id, medium)
      VALUES ($1, 'live')
      RETURNING id 
      )
  , ins_2 AS (
      INSERT INTO live (production_id, location, start_date, end_date, url, image_url, theater)
      SELECT id, $2, $3, $4, $5, $6, $7 FROM ins_1
      RETURNING production_id
      )
  SELECT id FROM ins_1;`;
  pool.query(sqlText, [p.play_id, p.location, p.start_date, p.end_date, p.url, p.image_url, p.theater])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('error making database query', sqlText, error);
    res.sendStatus(500);
  })
})

//add filmed production
router.post('/film', (req, res)=>{
  const p = req.body;
  console.log(p);
  
  //delete properties with blank strings from object
  Object.keys(p).forEach((key) => (p[key] === '') && delete p[key]);
  const sqlText = `WITH ins_1 AS (
    INSERT INTO production (play_id, medium)
    VALUES ($1, 'film')
    RETURNING id 
    )
  , ins_2 AS (
    INSERT INTO film (production_id, release_date, title, poster_path, loose_adapt, tmdb_id)
    SELECT id, $2, $3, $4, $5, $6 FROM ins_1
    RETURNING production_id
    )
  SELECT id FROM ins_1;`;  
  pool.query(sqlText, [p.play_id, p.release_date, p.title, p.poster_path, p.loose_adapt, p.tmdb_id])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('error making database query', sqlText, error);
    res.sendStatus(500);
  })
})

module.exports = router;

