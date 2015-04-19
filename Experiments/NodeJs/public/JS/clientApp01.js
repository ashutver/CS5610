var app = angular.module("DeveloperApp", []);

app.controller("DeveloperController",
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