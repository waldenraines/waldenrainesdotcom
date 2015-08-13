describe('Controller: FooterController', function () {
    'use strict';

    var $scope;

    beforeEach(module('waldenrainesdotcom'));

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('FooterController', {
            $scope: $scope
        });
    }));

    it('Sets the current date on the $scope', function () {
        var currentDay = new Date().getDay();
        expect($scope.currentDate.getDay()).toEqual(currentDay);
    });
});
