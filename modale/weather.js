const axios = require('axios'); 
module.exports = weatherHand;


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
