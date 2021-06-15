const express = require('express');
const server = express(); 
const weather = require('./asetss/weather.json');
const axios = require('axios');
const cors = require('cors');
require(`dotenv`).config();


const PORT = process.env.PORT; 
server.use(cors()); 
const arr=[];

//localhost:3050/
server.get('/',(req,res) =>{
    res.send('I am in the root route, I am Mohammad');
})

//localhost:3050/test
server.get('/test',(req,res) =>{
    res.send('hello from test route');
})

server.get('/weather',weatherHand)


// https://api.weatherbit.io/v2.0/forecast/daily?lat=48.8566969&lon=2.3514616&key=df33afa53a0b46aab6cd4119db43aac6

//localhost:3050/weather?cityLat=-31.9515694&cityLon=35.9239625
function weatherHand(req,res){
   let lat=req.query.cityLat;
   let lon=req.query.cityLon;
   let key=process.env.weatherApi;
   let weatherUrl=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;

   axios.get(weatherUrl).then(apiResult =>{
    const weatherArray = apiResult.data.data.map(item=>{
    return new weatheritem(item);
    })
res.send(weatherArray);
})
.catch(err =>{
    res.send(`there is an error in getting the data => ${err}`);
})

   
}

class weatheritem{
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
       this.temp = item.high_temp
    }
}
//localhost:3050 .....
server.get('*',(req,res) =>{
    res.status(404).send('sorry, this page not found');
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})