const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get user history
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sqlText = `SELECT * from viewing
    JOIN production on production.id = viewing.production_id
    LEFT JOIN film ON film.production_id = viewing.production_id
    LEFT JOIN live ON live.production_id = viewing.production_id
    JOIN play ON production.play_id = play.id
    WHERE person_id = $1
    ORDER BY date desc;`; 
    pool.query(sqlText, [id])
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('error completing request for user history', err);
      res.sendStatus(500);
    });
});

module.exports = router;