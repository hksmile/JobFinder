var mongoose = require("mongoose");
var Promise = require("bluebird");

var jobSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String}
});


exports.model = mongoose.model('Job', jobSchema);



