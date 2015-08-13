/**
 * @ngdoc overview
 * @name waldenrainesdotcom.code
 * @description
 * code module of the application.
 */
angular.module('waldenrainesdotcom.code', [
    'angular-websocket',
    'ui.router'
]);

angular.module('waldenrainesdotcom.code').config(function ($urlRouterProvider, $stateProvider) {
    'use strict';

    $urlRouterProvider.when('/code', '/code/websocket');

    $stateProvider.state('code', {
        url: '/code',
        templateUrl: 'app/code/views/code.html'
    });

    $stateProvider.state('code.websocket', {
        url: '/websocket',
        controller: 'WebSocketController',
        templateUrl: 'app/code/views/websocket.html'
    });
});
