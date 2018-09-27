
const express = require("express");
const router = express.Router();

const apiKey = "2add6bdc39943f0938fac2913bb5d0c4";

const http = require("http");

router.get("/home/:city",function(req,res,next){
    
    http.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}&units=metric`, (resp) => {
        let data = '';
      
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(JSON.parse(data));
          res.send(data);
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send("Error: " + err.message);
      });
});

module.exports = router;