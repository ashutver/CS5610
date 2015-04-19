var app = angular.module("DeveloperApp", []);

app.controller("DeveloperController",
    function ($scope,$http) {
        $scope.hello = "hello";
        $http.get("/developer")
        .success(function (response) {
            $scope.developers = response;
        });
        $scope.removeDev = function (index) {
            //console.log(index);
            $http.delete("/developer/" + index)
            .success(function (response) {
                $scope.developers = response;
            });
        };
        $scope.add = function (developer) {
            $http.post("/developer", developer)
        .success(function (response) {
            $scope.developers = response;
        });
        }
});

//console.log("hi");