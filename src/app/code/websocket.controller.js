/**
 * @ngdoc controller
 * @name waldenrainesdotcom.code.controller:WebSocketController
 * @requires $scope
 * @requires $websocket
 * @description
 * Controller for displaying a chat relay via a WebSocket.
 */

angular.module('waldenrainesdotcom.code').controller('WebSocketController', function ($scope, $websocket) {
    'use strict';

    var dataStream = null;

    $scope.newMessage = null;
    $scope.messages = [];
    $scope.connectionOpen = false;
    $scope.connectionError = false;

    $scope.connect = function () {
        dataStream = $websocket('wss://websocket-walden.rhcloud.com:8000');

        dataStream.onMessage(function(message) {
            if (message && message.hasOwnProperty('data')) {
                $scope.messages.push(message.data);
            }
        });

        dataStream.onOpen(function () {
            $scope.$apply(function () {
                $scope.connectionOpen = true;
            });
        });

        dataStream.onError(function () {
            $scope.$apply(function () {
                $scope.connectionError = true;
            });
        });
    };

    $scope.closeConnection = function () {
        dataStream.close();
        $scope.messages = [];
        $scope.connectionOpen = false;
    };

    $scope.sendMessage = function (message) {
        dataStream.send(message);
        $scope.messages.push(message);
        $scope.newMessage = null;
    };
});

