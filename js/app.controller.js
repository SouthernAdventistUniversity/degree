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
            if (e) {
                $scope.size = 'xs';
            }
        });
        $scope.$watch(function() { return $mdMedia('sm'); }, function(e) {
            $scope.sm = e;
            if (e) {
                $scope.size = 'sm';
            }
        });
        $scope.$watch(function() { return $mdMedia('md'); }, function(e) {
            $scope.md = e;
            if (e) {
                $scope.size = 'md';
            }
        });
        $scope.$watch(function() { return $mdMedia('lg') || $mdMedia('gt-lg') }, function(e) {
            $scope.lg = e;
            if (e) {
                $scope.size = 'lg';
            }
        });
    }
})();