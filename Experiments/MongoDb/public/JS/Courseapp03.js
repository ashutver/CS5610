var app = angular.module("CourseApp", []);

app.factory("CoursesService", function ($http) {
    var findAll = function (callback) {
        $http.get("/api/course")
       .success(callback);
    };
    return {
        findAll: findAll
    };
});

app.controller("CourseController", function ($scope, $http, CoursesService) {
   
    CoursesService.findAll(function (response) {
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
    $scope.addProject = function (project) {
        $scope.course.project.push(project);
        $http.put("/api/course/" + $scope.course._id, $scope.course)
        .success(function (response) {
            $scope.courses = response;
            $scope.project = {};
        })
    };
    $scope.removeProject = function (projectIndex) {
        $scope.course.project.splice(projectIndex,1);
        $http.put("/api/course/" + $scope.course._id, $scope.course)
        .success(function (response) {
            $scope.courses = response;
        });
    };
});