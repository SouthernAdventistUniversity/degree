(function() {
    'use strict';

    angular
        .module('SouthernDegree')
        .component('degreeFinder', {
            templateUrl: './views/finder.html',
            controller: FinderController,
            bindings: {
                size: '='
            }
        });

    FinderController.$inject = ['$scope', '$http', 'app'];

    function FinderController($scope, $http, app) {
        var $ctrl = this;
        console.log($scope, this);

        $scope.app = app;

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

        $scope.getCourseInfo = function(id, cat_id) {
            app.hasBackdrop = true
            $http.get('//staging.southern.edu/content?id=' + id + '&catId=' + cat_id).then(function(e) {
                console.log(e.data);
                var data = e.data
                var description = data.parents[0].description.replace(/<(?:.|\r\n)*?>/gm, '').split('\n')

                var short = []
                description.forEach(function(line) {
                    if (line.length > 1)
                        short.push(line);
                })
                var chair = [short[0].split(': ')[1]]
                var faculty = short[1].split(': ')[1].split(', ');
                var staff = chair.concat(faculty)
                console.log(staff)
                $scope.course = {
                    name: data.name,
                    parent_name: data.parents[0].name,
                    required: {
                        name: data.cores[0].name,
                        courses: cat_id == 14 ? data.cores[0].courses : data.cores[0].children[0].courses
                    }
                }

                $scope.staff = []
                faculty.forEach(function(member) {
                    $http.get('http://www.southern.edu/api/people-search/?' + member).then(function(e) {
                        if (e.data[0])
                            $scope.staff.push(e.data[0]);
                    });
                })


                console.log($scope.staff)
            })
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