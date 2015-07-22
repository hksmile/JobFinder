var expect = require("chai").expect;
var mongoose = require("mongoose");
var Promise = require("bluebird");
var jobsData = require("../../jobs-data.js");

function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}



var connectDB = Promise.promisify(mongoose.connect, mongoose);

//mongoose.connect('mongodb://localhost/jobfinder');
//mongoose.connect('mongodb://hks:chorebag@ds047612.mongolab.com:47612/jobfinder');

describe ("get jobs", function()
{
    var jobsList;

    //before allows us to setup the connection and the data before we run all our tests
    before(function(done) {
        connectDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs) //this is just a reference which is why we don't have a parameter
            .then(function (collection)
            {
                jobsList = collection;
                done();

            });

    });

    after(function(){
        mongoose.connection.close();
    });


    it("should never be empty since jobs are seeded", function ()
    {
        expect(jobsList.length).to.be.at.least(1);

    });

    it ("should have a job with a title", function() {
       expect(jobsList[0].title).to.not.be.empty;
    });

    it ("should have a job with a description", function() {
        expect(jobsList[0].description).to.not.be.empty;
    });

});

describe("db save jobs", function(){
    var job = {title:'TEST', description:'Test is Saving'};
    var jobs;

    function saveTestJob() {
        return jobsData.saveJob(job);
    }

    before(function(done) {
        connectDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(saveTestJob)
            .then(jobsData.findJobs) //this is just a reference which is why we don't have a parameter
            .then(function setJobs(collection)
            {
                jobs = collection;
                done();

            });

    });

    after(function(){
        mongoose.connection.close();
    });

    it("should have one job after saving one job", function(){
        expect(jobs).to.have.length(1);
    });


});



