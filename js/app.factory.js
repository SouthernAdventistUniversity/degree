(function() {
    'use strict';

    angular
        .module('SouthernDegree')
        .factory('app', app);

    function app() {
        var service = {
            hasBackdrop: false
        };

        return service;
    }
})();