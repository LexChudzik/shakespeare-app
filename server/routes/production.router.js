const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get current or future live productions
router.get('/', (req, res) => {
    const sqlText = `SELECT 
                        production.id AS production_id,
                        play_id, start_date, end_date,
                        live.location AS location,
                        company.name AS company_name,
                        play.title AS title,
                        live.image_url AS image_url
                    FROM production 
                    JOIN live ON id = live.production_id 
                    JOIN play ON play_id = play.id
                    JOIN company ON company_id = company.id
                    WHERE live.end_date > NOW();`;
    pool.query(sqlText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT production query', err);
      res.sendStatus(500);
    });
});

//get live production detail for one production
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sqlText = `SELECT 
                        production.id AS production_id,
                        play_id, start_date, end_date, genre, alt_genre,
                        live.location AS location,
                        company.name AS company_name,
                        play.title AS title,
                        live.image_url AS image_url,
                        company.url AS company_url,
                        live.url AS production_url
                    FROM production 
                    JOIN live ON id = live.production_id 
                    JOIN play ON play_id = play.id
                    JOIN company ON company_id = company.id
                    WHERE production.id=$1;`;
    pool.query(sqlText, [id])
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT production by id query', err);
      res.sendStatus(500);
    });
});

module.exports = router;

