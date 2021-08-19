const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  console.log("Post request recieved!");

  const query = req.body.cityName;
  const apiKey = "f4d8a607ddc97154fbdb1fbfa8a9844c#";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid=" + apiKey;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.set("Content-Type", "text/html");
      res.write("The weather is currently " + description);
      res.write("<h1>The temperature in "+query+" is " + temp + " degree Celcius.</h1>");
      res.write("<img src=" + imageUrl +">");
      res.send();
    })

  });
});



app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
