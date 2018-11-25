const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get user history
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sqlText = ';'; //needs
    pool.query(sqlText, [id])
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('error completing request for user history', err);
      res.sendStatus(500);
    });
});

module.exports = router;