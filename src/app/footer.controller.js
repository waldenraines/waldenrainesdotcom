/**
 * @ngdoc controller
 * @name waldenrainesdotcom.controller:FooterController
 * @requires $scope
 * @description
 * Used to populate the current date in the footer.
 */

angular.module('waldenrainesdotcom').controller('FooterController', function ($scope) {
    'use strict';

    $scope.currentDate = new Date();
});
