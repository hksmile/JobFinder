var express  = require('express');
var mongoose = require('mongoose');
var jobsData = require("./jobs-data.js");



var app = express();
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

var jobService = require("./jobs-service")(jobsData, app);



//show data
app.get('*', function(req, res){
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder'); //will create if it doesn't find
//jobsData.connectDB('mongodb://localhost/jobfinder')
jobsData.connectDB('mongodb://hks:chorebag@ds047612.mongolab.com:47612/jobfinder')
    .then(function() {
        console.log('connected to mongodbsuccessfully!');
        jobsData.seedJobs();
    });

app.listen(process.env.PORT || 3000, process.env.IP);




