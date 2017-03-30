(function() {
    'use strict';

    angular
        .module('SouthernDegree')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$mdMedia', 'app'];

    function AppController($scope, $mdMedia, app) {
        var vm = this;

        $scope.app = app;

        ////////////////

        $scope.$watch(function() { return $mdMedia('xs'); }, function(e) {
            $scope.xs = e;
        });
        $scope.$watch(function() { return $mdMedia('sm'); }, function(e) {
            $scope.sm = e;
        });
        $scope.$watch(function() { return $mdMedia('md'); }, function(e) {
            $scope.md = e;
        });
        $scope.$watch(function() { return $mdMedia('lg') || $mdMedia('gt-lg') }, function(e) {
            $scope.lg = e;
        });
    }
})();