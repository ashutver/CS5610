var app = angular.module("CourseApp", []);



app.controller("CourseController", function ($scope, $http) {
    $http.get("/api/course" )
        .success(function (response) {
            $scope.courses = response;
        });
    $scope.remove = function (id) {
        $http.delete("/api/course" + id)
        .success(function (response) {
            $scope.courses = response;
        })
    };
    $scope.add = function (course) {
        $http.post("/api/course", course)
        .success(function (response) {
            $scope.courses = response;
        })
    };
    $scope.select = function (index) {
        $scope.course = $scope.courses[index];
        $scope.courseId = index;
        $scope.edit = "edit";
    };
    $scope.editD = function (course) {
        console.log(course._id);
        $http.put("/api/course/" + course._id, course)
        .success(function (response) {
            //$scope.courses = course;
        });
        $scope.course = {};
        $scope.courseId = undefined;
        $scope.edit = undefined
    };
});