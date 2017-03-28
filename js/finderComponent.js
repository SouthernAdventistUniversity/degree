(function() {
    'use strict';

    angular
        .module('SouthernDegree')
        .component('degreeFinder', {
            templateUrl: './views/finder.html',
            controller: FinderController,
        });

    FinderController.$inject = ['$scope', '$http'];

    function FinderController($scope, $http) {
        var $ctrl = this;


        $scope.user = {
            level: " ",
            college: " "
        }

        $scope.levels = ['Non-Degree', 'Certificate', 'Minor', 'Associate', 'Bachelor', 'Master'];

        console.log($scope);

        ////////////////

        $scope.$watch('filtered', function(e) {
            console.log(e);
        })

        $http.get('//staging.southern.edu/departments').then(function(e) {
            var data = e.data;
            var schools = [];
            data.forEach(function(info) {
                if (schools.indexOf(info.school) === -1)
                    schools.push(info.school);
            })
            $scope.schools = schools;
            $scope.degrees = data;
            console.log(data, $scope.schools);
        });

        $scope.degreeFilter = function(degrees) {
            try {
                return (degrees.level.indexOf($scope.user.level) > -1) && (degrees.school.indexOf($scope.user.college) > -1)
            } catch (e) {}
        }
    }
})();