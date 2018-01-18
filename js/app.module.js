(function() {
    'use strict';

    angular.module('SouthernDegree', [
            'ngMaterial',
            'ngAnimate',
            'ngSanitize',
            'chart.js',
            'countTo'
        ])
        .filter('rawHtml', ['$sce', function($sce) {
            return function(val) {
                return $sce.trustAsHtml(val);
            };
        }]);
})();