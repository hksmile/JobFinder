/**
 * Created by scott on 6/23/15.
 */
app = angular.module('app', ['ngResource']);

angular.module('app').controller('testCtrl', function($scope, $resource, jobs) {
    $scope.test = "really working";
    $scope.jobs = $resource('/api/jobs').query(); //not the best way to do this with angular.. but is the simplest
    //var newJob = {title:'babysitter', description:'babysitting'};
    //jobs.save(newJob);

    $scope.submit = function() {
        var newJob = {title: $scope.title, description: $scope.description};
        jobs.save(newJob);
        $scope.jobs.push(newJob);


    }
});