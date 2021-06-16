const express = require('express');
const server = express();
const weather = require('./asetss/weather.json');
const axios = require('axios');
const cors = require('cors');
require(`dotenv`).config();
const movieHand = require('./modale/movie');
const weatherHand = require('./modale/weather');


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



//localhost:3050 .....
server.get('*', (req, res) => {
    res.status(404).send('sorry, this page not found');
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})