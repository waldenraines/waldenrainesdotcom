/**
 * @ngdoc directive
 * @name waldenrainesdotcom.components:scrollingWell
 *
 * @description
 *   A directive that creates a well that scrolls as more data is added.
 */
angular.module('waldenrainesdotcom.components').directive('scrollingWell', function () {
    'use strict';

    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'app/components/views/scrolling-well.html',
        scope: {
            height: '@scrollingWell',
            items: '=scrollItems'
        },
        link: function (scope, element) {
            var well = angular.element(element.children()[0]);

            if (scope.height) {
                well.css('height', scope.height);
                well.css('max-height', scope.height);
            }

            scope.$watch('items', function (items) {
                if (items) {
                    well[0].scrollTop = well[0].scrollHeight;
                }
            }, true);
        }
    };
});
