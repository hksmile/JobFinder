/**
 * Created by scott on 6/23/15.
 */
angular.module('app', ['ngResource']);

angular.module('app').controller('testCtrl', function($scope, $resource) {
    $scope.test = "working";
    $scope.jobs = $resource('/api/jobs').query(); //not the best way to do this with angular.. but is the simplest
});