var app = angular.module("DeveloperApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/developer', {
            templateUrl: 'developerApp/home.html',
            controller: 'homeController'
        }).
        when('/developer/:id', {
            templateUrl: 'developerApp/details.html',
            controller: 'detailsController'
        }).
        otherwise({
            redirectTo: '/developer'
        });
  }]);

app.controller("detailsController", function ($scope, $http, $routeParams) {
    var index = $routeParams.id;
    $http.get("/api/developer/" + index)
    .success(function (response) {
        $scope.developer = response;
    });
});
app.controller("DeveloperController", function ($scope, $http) {

});

app.controller("homeController",
    function ($scope,$http) {
        $scope.edit = null;
        $http.get("/api/developer")
        .success(function (response) {
            $scope.developers = response;
        });
        $scope.removeDev = function (index) {
            //console.log(index);
            $http.delete("/api/developer/" + index)
            .success(function (response) {
                $scope.developers = response;
            });
        };
        $scope.add = function (developer) {
            $http.post("/api/developer", developer)
        .success(function (response) {
            $scope.developers = response;
        });
        }
        $scope.select = function (index) {
            $scope.developer = $scope.developers[index];
            $scope.edit = "edit";
            $scope.developerId = index;
            console.log("select");
        }
        $scope.editD = function (developer) {
            $http.put("/api/developer/" + $scope.developerId, developer)
           .success(function (response) {
               $scope.developers = response;
           });
            $scope.edit = undefined;
            $scope.developer = {};
            $scope.developerId = undefined;
        }
});

//console.log("hi");