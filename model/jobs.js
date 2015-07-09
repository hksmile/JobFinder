var mongoose = require("mongoose");
var Promise = require("bluebird");

var jobSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

var jobs = [
    {title: 'Cook', description: 'You will make bagels'},
    {title: 'Waiter', description: 'Do not spit in the food'},
    {title: 'Programmer', description: 'type type type'},
    {title: 'Axe Maker', description: 'Please make more axes'}
];

function findJobs(query)
{
    return Promise.cast(mongoose.model('Job').find(query).exec());
}

exports.findJobs = findJobs;

var createJob = Promise.promisify(Job.create, Job);

//seed the jobs
exports.seedJobs = function() {
    return findJobs({}).then(function(collection)
    {
            if (collection.length ===0){
                return Promise.map(jobs, function(job){
                    return createJob(job);
                })
            }
        });
};
