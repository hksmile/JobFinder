/**
 * Created by scott on 6/23/15.
 */
angular.module('app', []);

angular.module('app').controller('testCtrl', function($scope) {
    $scope.test = "working";
    $scope.jobs = [{
        title: 'Sales Person',
        description: 'you will fight dragons'
        },
        {
            title: "Accountant",
            description: "you will be bored"
        }]
});