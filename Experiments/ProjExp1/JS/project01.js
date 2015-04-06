"use strict"
var app = angular.module("PassportApp", ["ngRoute", 'ui.bootstrap']);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
     when('/home', {
         templateUrl: 'views/home/home.html',
         controller: 'homeCtrl'
     })
     .when('/profile/', {
         templateUrl: 'views/profile/profile.html',
         controller: 'ProfileController',
         resolve: {
             loggedin :checkLoggedin
         }
     })
     .when('/profile/:id', {
        templateUrl: 'views/profile/profile.html',
        controller: 'ProfileController'
        })
   //  .when('/login/', {
     //    templateUrl: 'views/login/login.html',
      //    controller: 'LoginCtrl'
     //})
     .when('/workout', {
            templateUrl: 'views/workout/workout.html',
            controller: 'workCtrl'
     })
    .when('/workout/:id', {
           templateUrl: 'views/workoutdetail/workoutdetail.html',
           controller: 'workdetCtrl'
    })
    .when('/exercise/', {
          templateUrl: 'views/exercise/exercise.html',
          controller: 'exrcsCtrl'
    })
    .when('/exercise/:id', {
          templateUrl: 'views/exercisedetail/exercisedetail.html',
          controller: 'exrcsDetCtrl'
    })
    .when('/muscle', {
         templateUrl: 'views/muscle/muscle.html',
          controller: 'muscleCtrl'
    })
    .when('/signup/', {
         templateUrl: 'views/signup/signup.html',
         controller: 'signupCtrl'
    })
   .when('/equipment/', {
       templateUrl: 'views/equipment/equipment.html',
        controller: 'equipCtrl'
   })
    .when('/nutrition/', {
        templateUrl: 'views/nutrition/nutrition.html',
        controller: 'nutriCtrl'
    })
    .when('/nutrition/:id', {
        templateUrl: 'views/nutritiondetail/nutritiondetail.html',
        controller: 'nutriDetCtrl'
    })
     .otherwise({
         redirectTo: '/home'
     });
}]);
app.controller("navCntrl", function ($scope, $http, $location, $rootScope, ExerciseService, $modal) {
    $rootScope.currentUser = null;
    $scope.logout = function () {
        $http.post("/api/logout")
        .success(function (res) {
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    }
    //for login
    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'content.html',
            controller: 'LoginCtrl',
            });
    }
});

app.factory("ExerciseService", function ($http) {
    var exercises = null;
    var images = null;
    var nutrients =[];
 /*   $http.get("http://wger.de/api/v2/exercise/?format=json&limit=170&language=2&callback=JSON_CALLBACK&ordering=name")
     .success(function (response) {
         exercises = response.results;
         console.log("exercises length:"+exercises.length);
     });*/
    $http.get("https://wger.de/api/v2/exerciseimage/?limit=205&callback=JSON_CALLBACK")
    .success(function (response) {
        images = response.results;
        console.log("images length:" + images.length);
        //console.log(images);
    });
    $http.get("http://wger.de/api/v2/ingredient/?format=json&limit=8317&callback=JSON_CALLBACK")
        .success(function (response) {
            nutrients = response.results;
        });
           
    var getExercises = function () {
        return exercises;
    }
    var getImages = function () {
        return images;
    }
    var getNutrients = function () {
        return nutrients;
    }
    return {
       // getExercises: getExercises,
        getImages: getImages,
        getNutrients: getNutrients
    }
})
var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/api/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        //user is Authenticated
       // console.log(user);
        if (user != '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            $rootScope.errorMessage = "you need to login";
            deferred.reject();
            $location.url("/login");
        }
    });
}

