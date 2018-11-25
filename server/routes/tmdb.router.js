const express = require('express');
const router = express.Router();
const axios = require('axios');


//search tmdb
router.post('/', (req, res) => {
    let search = req.body.search;
    console.log(search);
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${search}&language=en-US&include_adult=false`).then( (response) => {
        res.send(response.data.results)
        console.log(response.data.results);
        
    }).catch( (error) => {
        console.log('error getting from tmdb', error)
    })
});

//get info on film with tmdb_id
router.post('/', (req,res) => {
    let id = req.body;
    console.log(id);
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=credits`)
        .then((response) => {
            res.send(response.data)
        }).catch( (error) => {
            console.log('error getting from tmdb', error);
        })
})

module.exports = router;