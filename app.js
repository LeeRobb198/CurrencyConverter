var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope, $http) {

  $scope.home = "This is the homepage";

  $scope.getRequest = function() {
    console.log("I've been pressed!");
    $http.get("https://api.exchangeratesapi.io/latest").then(
      function successCallback(response) {
        $scope.response = response;
        console.log($scope);
        console.log("Successful response");
      },
      function errorCallback(response) {
        console.log("Unable to perform get request");
      }
    );
  };


});
