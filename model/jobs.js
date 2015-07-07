var mongoose = require("mongoose");

var jobSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

//seed the jobs
exports.seedJobs = function() {
    Job.find({}).exec(function(error, collection){
        if (collection.length ===0){
            Job.create({title:'Cook', description:'You will make bagels'});
            Job.create({title:'Waiter', description:'Do not spit in the food'});
            Job.create({title:'Programmer', description:'type type type'});
            Job.create({title:'Axe Maker', description:'Please make more axes'});
        }
    })
};
