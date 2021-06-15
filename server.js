const express = require('express');
const server = express(); 
const weather = require('./asetss/weather.json');
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

// http://localhost:3050/getNames?cityName=Amman
//localhost:3050/getNames?cityName=Amman
//localhost:3050/getNames?cityLan=-33.87&cityLon=151.21
server.get('/getNames',(req,res)=>{
    let lan=req.query.cityLan;
    let lon=req.query.cityLon;
        let cityNames = weather.city.find(item=>{
            if(item.lat == lan && item.lon==lon)
            return item.city_name;
        })
        let forecast1 =  new Forecast(cityNames.date,cityNames.description) ;
        arr.push(forecast1);
        res.send(cityNames);
    })
    class Forecast {
        constructor( date1, description1){
             this.date = date1;
             this.description= description1;
        }
    }


//localhost:3050 .....
server.get('*',(req,res) =>{
    res.status(404).send('sorry, this page not found');
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})