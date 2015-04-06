app.controller("signupCtrl", function ($scope, $http, $rootScope, $routeParams, ExerciseService,$location) {

    $scope.signup = function (user) {
        user.pic = "/ProjExp1/views/exercisedetail/dummy.png";
        $http.post("/api/signup/", user)
        .success(function (response) {
          //  $rootScope.currentUser = response;
            console.log(response);
            $location.url("/#");
        });
    }
});




 