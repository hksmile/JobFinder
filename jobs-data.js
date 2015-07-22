/**
 * Created by scott on 7/9/15.
 */
//could move all access to the database into here.. so jobs would use jobs-data to drive the model
//seed jobs
//find jobs
//reset jobs
//open db connection

var mongoose = require("mongoose");
var Promise = require ("bluebird");
var jobModel = require('./model/job');

var Job = jobModel.model;

var seedJobs = [
    {title: 'Cook', description: 'You will make bagels'},
    {title: 'Waiter', description: 'Do not spit in the food'},
    {title: 'Programmer', description: 'type type type'},
    {title: 'Axe Maker', description: 'Please make more axes'}
];


var findJobs = function(query)
{
    return Promise.cast(Job.find(query).exec());
};

var createJob = Promise.promisify(Job.create, Job);
exports.saveJob = createJob;

//exports
exports.findJobs = findJobs;
exports.connectDB = Promise.promisify(mongoose.connect, mongoose);
exports.seedJobs = function() {
    return findJobs({}).then(function(collection)
    {
        if (collection.length ===0){
            return Promise.map(seedJobs, function(job){
                return createJob(job);
            })
        }
    });
};

