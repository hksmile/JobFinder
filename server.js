var express  = require('express');
var mongoose = require('mongoose');
var jobModel = require('./model/Jobs');

var app = express();
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


//get data
app.get('/api/jobs', function(req, res) {
    mongoose.model('Job').find({}).exec(function(error, collection){
        res.send(collection);
    })
});

//show data
app.get('*', function(req, res){
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder'); //will create if it doesn't find
mongoose.connect('mongodb://hks:chorebag@ds047612.mongolab.com:47612/jobfinder');
var con = mongoose.connection;
con.once('open', function() {
    console.log('connected to mongodbsuccessfully!');
    jobModel.seedJobs();});
app.listen(process.env.PORT||3000);

