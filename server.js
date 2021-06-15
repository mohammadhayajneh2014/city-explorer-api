const express = require('express');
const server = express();
const weather = require('./asetss/weather.json');
const axios = require('axios');
const cors = require('cors');
require(`dotenv`).config();


const PORT = process.env.PORT;
server.use(cors());
const arr = [];

//localhost:3050/
server.get('/', (req, res) => {
    res.send('I am in the root route, I am Mohammad');
})

//localhost:3050/test
server.get('/test', (req, res) => {
    res.send('hello from test route');
})

server.get('/weather', weatherHand)
server.get('/movie', movieHand)

// https://api.weatherbit.io/v2.0/forecast/daily?lat=48.8566969&lon=2.3514616&key=df33afa53a0b46aab6cd4119db43aac6

//localhost:3050/weather?cityLat=-31.9515694&cityLon=35.9239625
function weatherHand(req, res) {
    let lat = req.query.cityLat;
    let lon = req.query.cityLon;
    let key = process.env.weatherApi;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;

    // https://api.themoviedb.org/3/movie/550?api_key=2d0a818bc11486923a609e1d49b0c50e

    axios.get(weatherUrl).then(apiResult => {
        const weatherArray = apiResult.data.data.map(item => {
            return new weatheritem(item);
        })
        res.send(weatherArray);
    })
        .catch(err => {
            res.send(`there is an error in getting the data => ${err}`);
        })
}

class weatheritem {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
        this.temp = item.high_temp
    }
}

//localhost:3050//movie?moviecity=amman

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
        this.imagel=item.poster_path;
        this.popularity=item.popularity;
        this.releasedOn=item.release_date;
    }
}


//localhost:3050 .....
server.get('*', (req, res) => {
    res.status(404).send('sorry, this page not found');
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})