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
            level: ["All Programs"],
            college: ["All Schools"],
            page: 0
        }

        $scope.levels = ['Non-Degree', 'Certificate', 'Minor', 'Associate', 'Bachelor', 'Master'];

        ////////////////

        $scope.getArray = function(num) {
            if (num) {
                var numArray = [];
                num = Math.ceil(num / 10);
                for (var i = 0; i < num; i++) {
                    numArray.push(i);
                }
                $scope.maxPages = num;
                return numArray
            }
        }

        $http.get('//staging.southern.edu/departments').then(function(e) {
            var data = e.data;
            var schools = [];
            data.forEach(function(info) {
                if (schools.indexOf(info.school) === -1)
                    schools.push(info.school);
            })
            $scope.schools = schools;
            $scope.degrees = data;
        });

        $scope.degreeFilter = function(degrees) {
            try {
                var check = false
                $scope.user.level.forEach(function(level) {
                    if (degrees.level.indexOf(level) > -1 || level == "All Programs") {
                        $scope.user.college.forEach(function(college) {
                            if (degrees.school.indexOf(college) > -1 || college == "All Schools") {
                                check = true;
                            }
                        })
                    }
                })
                return check;
            } catch (e) {}
        }
    }
})();