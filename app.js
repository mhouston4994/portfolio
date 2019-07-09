require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var session = require('express-session');
var flash = require("connect-flash");
var async = require("async");
var listenPort = process.env.PORT || "3000";
var listenIP = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

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

// REQUEST INFO
   app.post('/contact', function(req, res, next) {
    async.waterfall([
      function(done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'SendGrid', 
          auth: {
            user: 'mhouston4994',
            pass: process.env.SENDGRIDPW
          }
        });
        var mailOptions = {
          to: "mhouston4994@gmail.com",
          from: 'requestForInfo@portfolio.com',
          subject: 'Request For Info',
          text: req.body.userText
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          req.flash('success', "Message sent to Matthew! He will connect with you soon!");
          done(err, 'done');
        });
      }
    ],
    function(err) {
      if (err) return next(err);
      req.flash("error", "Something Went Wrong");
      res.redirect('/contact');
    })
  });

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server Started");
})