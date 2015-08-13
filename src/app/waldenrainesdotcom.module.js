/**
 * @ngdoc overview
 * @name waldenrainesdotcom
 * @description
 * # waldenrainesdotcom
 *
 * Main module of the application.
 */
angular.module('waldenrainesdotcom', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
]);

angular.module('waldenrainesdotcom').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    'use strict';

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'app/views/home.html'
    });

    $stateProvider.state('resume', {
        url: '/resume',
        templateUrl: 'app/views/resume.html'
    });

    $stateProvider.state('projects', {
        url: '/projects',
        templateUrl: 'app/views/projects.html'
    });

    $stateProvider.state('sandbox', {
        url: '/sandbox',
        templateUrl: 'app/views/sandbox.html'
    });

    $stateProvider.state('404', {
        templateUrl: 'app/views/404.html'
    });

    $urlRouterProvider.otherwise(function($injector, $location){
        var state = $injector.get('$state');
        state.go('404');
        return $location.path();
    });

    // Configure html5 mode, otherwise URLs will be base.com/#/home rather than base.com/home.
    // The hashPrefix and the <meta name="fragment" content="!" /> in the index allows google to crawl correctly.
    $locationProvider.html5Mode(true).hashPrefix('!');
});
