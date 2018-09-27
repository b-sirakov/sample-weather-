
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routers/main-router");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.json());

app.use(router);

//listen for requests
app.listen(process.env.port || 4000,function(){
    console.log("Now listening for requests");
});