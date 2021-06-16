const axios = require('axios');
module.exports= movieHand;



//localhost:3050/movie?moviecity=amman

function movieHand(req, res) {
    let moviecity = req.query.moviecity;
    let key = process.env.movieApi;
    let movieUrl =  `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${moviecity}&page=1`;
    

    axios.get(movieUrl).then(apiResult => {
        const movieArray = apiResult.data.results.map(item => {
            return new movieitem(item);
        })
        res.send(movieArray);
    })
        .catch(err => {
            res.send(`there is an error in getting the data => ${err}`);
        })
}

class movieitem {
    constructor(item) {
        this.original=item.original_title;
        this.overview=item.overview;
        this.averageVotes=item.vote_average;
        this.totalVotes=item.total_votes;
        this.imagel= `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        this.popularity=item.popularity;
        this.releasedOn=item.release_date;
    }
}
