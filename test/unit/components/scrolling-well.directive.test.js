describe('Directive: scrollingWell', function () {
    'use strict';

    var well, $scope, elementScope, compileDirective;

    beforeEach(module(
        'waldenrainesdotcom.components',
        'app/components/views/scrolling-well.html'
    ));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;

        compileDirective = function (element) {
            $compile(element)($scope);
            $scope.$digest();

            elementScope = element.isolateScope();
            well = element.find('.well');
        };
    }));

    it('creates a .well with a .scrolling-well class', function () {
        var html = '<div scrolling-well></div>';
        compileDirective(angular.element(html));

        expect(well.hasClass('well')).toBe(true);
        expect(well.hasClass('scrolling-well')).toBe(true);
    });

    it('sets the height and max-height of the element if provided', function () {
        var html = '<div scrolling-well="100px"></div>';
        compileDirective(angular.element(html));

        expect(well.css('height')).toBe('100px');
        expect(well.css('max-height')).toBe('100px');
    });

    it('updates the height to the scrollHeight when the items change if items are provided', function () {
        var html = '<div scrolling-well="10px" style="position: absolute; overflow-y: scroll;" scroll-items="items">' +
                     '<p style="height: 25px;" ng-repeat="item in items">' +
                       '{{ item }}' +
                     '</p>' +
                   '</div>';

        $scope.items = [1, 2, 3, 4];
        compileDirective(angular.element(html));
        $scope.$digest();

        expect(well[0].scrollTop).toBe(well[0].scrollHeight);
    });
});
