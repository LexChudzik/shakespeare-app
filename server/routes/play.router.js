const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get array of plays from db
router.get('/', (req, res) => {
    const sqlText = 'SELECT * FROM play ORDER BY title;';
    pool.query(sqlText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT play query', err);
      res.sendStatus(500);
    });
});

module.exports = router;