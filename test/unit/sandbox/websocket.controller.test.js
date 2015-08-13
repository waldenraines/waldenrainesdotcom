describe('Controller: WebSocketController', function () {
    'use strict';

    var $scope, dataStream, message;

    beforeEach(module('waldenrainesdotcom.code'));

    beforeEach(inject(function ($controller, $rootScope) {
        var $websocket;

        dataStream = {
            error: false,
            close: function () {},
            send: function () {},
            onMessage: function (callback) {
                callback(message);
            },
            onError: function (callback) {
                if (this.error) {
                    callback();
                }
            },
            onOpen: function (callback) {
                if (!this.error) {
                    callback();
                }
            }
        };

        $websocket = function () {
            return dataStream;
        };

        $scope = $rootScope.$new();
        message = {};

        $controller('WebSocketController', {
            $scope: $scope,
            $websocket: $websocket
        });
    }));

    describe('connects to the WebSocket', function () {
        beforeEach(function () {
            spyOn(dataStream, 'onOpen').and.callThrough();
            spyOn(dataStream, 'onError').and.callThrough();
        });

        it("and succeeds", function () {
            $scope.connect();

            expect(dataStream.onOpen).toHaveBeenCalledWith(jasmine.any(Function));
            expect($scope.connectionOpen).toBe(true);
            expect($scope.connectionError).toBe(false);
        });

        it("and fails", function () {
            dataStream.error = true;

            $scope.connect();

            expect(dataStream.onError).toHaveBeenCalledWith(jasmine.any(Function));
            expect($scope.connectionError).toBe(true);
            expect($scope.connectionOpen).toBe(false);
        });

        describe("and receives messages", function () {
            beforeEach(function () {
                spyOn(dataStream, 'onMessage').and.callThrough();
            });

            afterEach(function () {
                expect(dataStream.onMessage).toHaveBeenCalledWith(jasmine.any(Function));
            });

            it("and adds them to the message list if formatted correctly", function () {
                message = {data: 'lalala'};

                $scope.connect();

                expect($scope.messages.indexOf(message.data)).toBe(0);
            });

            it("and does nothing if the message is formatted incorrectly", function () {
                message = 'lalala';
                $scope.connect();
                expect($scope.messages.indexOf(message)).toBe(-1);

                message = null;
                $scope.connect();
                expect($scope.messages.indexOf(message)).toBe(-1);
            });
        });
    });

    it('closes the WebSocket connection', function () {
        spyOn(dataStream, 'close');

        $scope.connect();
        $scope.closeConnection();

        expect(dataStream.close).toHaveBeenCalled();
        expect($scope.connectionOpen).toBe(false);
        expect($scope.messages.length).toBe(0);
    });

    it('sends a message', function () {
        var message = 'hello';

        spyOn(dataStream, 'send');

        $scope.connect();
        $scope.sendMessage(message);

        expect(dataStream.send).toHaveBeenCalledWith(message);
        expect($scope.messages.indexOf(message)).toBe(0);
        expect($scope.newMessage).toBe(null);
    });
});
