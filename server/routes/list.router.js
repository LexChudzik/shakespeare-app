const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//add to list
router.post('/', rejectUnauthenticated, (req, res) => {
  const l = req.body;
  const sqlText = `INSERT INTO list (production_id, person_id)
                    VALUES ($1, $2);`;
  pool.query(sqlText, [l.production_id, l.user.id])
  .then((result) => {
    res.sendStatus(200);})
  .catch((err) => {
    console.log('Error completing INSERT INTO list query', err);
    res.sendStatus(500);
  });
});

//remove from list
router.delete('/:id', rejectUnauthenticated, (req, res) => {
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