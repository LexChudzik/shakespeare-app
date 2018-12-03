const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//add viewing
router.post('/', rejectUnauthenticated, (req, res) => {
    const v = req.body;
      //delete properties with blank strings from object
    Object.keys(v).forEach((key) => (v[key] === '') && delete v[key]);
    const sqlText = `INSERT INTO viewing (production_id, person_id, date, rating, comments) 
	            VALUES ($1, $2, $3, $4, $5);`
    pool.query(sqlText, [v.production.production_id, v.user, v.date, v.rating, v.comments])
  .then((result) => { res.sendStatus(200); })
  .catch((err) => {
    console.log('Error completing INSERT view query', err);
    res.sendStatus(500);
  });
});

module.exports = router;