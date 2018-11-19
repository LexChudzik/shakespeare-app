const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {
    let search = req.body.search;
    console.log(search);
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.tmdb_api_key}&query=${search}`).then( (response) => {
        res.send(response.data.results)
    }).catch( (error) => {
        console.log('error getting from tmdb', error)
    })
});

module.exports = router;