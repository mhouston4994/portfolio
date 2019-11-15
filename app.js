require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var listenPort = process.env.PORT || "3000";
var listenIP = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//ROUTES
app.get("/", function(req, res){
    res.render("home", {title: "My Portfolio"});
});

app.get("/about", function(req, res){
    res.render("about", {title: "About Me"});
});

app.get("/work", function(req, res){
    res.render("work", {title: "View My Work"});
});

app.get("/contact", function(req, res){
    res.render("contact", {title: "Contact Me"});
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server Started");
})