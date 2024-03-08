const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const https = require('https');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    console.log("Post received");

    const query = req.body.cityName;
    const apikey = "da140ebf0c94c14b2a6fcfd73e80a7e8";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;

    https.get(url, function(urlRes){
        console.log(urlRes.statusCode);

        urlRes.on("data", function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);

            // var jsonObject = {
            //     name:"Hemil",
            //     favouriteFood:"Vaghareli Kichdi"
            // }
            // console.log(JSON.stringify(jsonObject));

            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            const city = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently "+description+"</p>")
            res.write("<h1>The temprature in "+query+" is "+temp+" degree Celcius</h1>");
            res.write("<img src="+imageUrl+">")
            res.send();
        });
    });

});


app.listen(3000, function(){
    console.log("Server is up on port 300");
})