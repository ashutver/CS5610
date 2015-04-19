var app = angular.module("CourseApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
     when('/home', {
         templateUrl: 'courseApp/home.html'
         // controller: 'PhoneListCtrl'
     }).
     when('/profile/:username', {
         templateUrl: 'courseApp/profile.html',
         controller: 'ProfileController'
     }).
     when('/contact', {
         templateUrl: 'courseApp/contact.html'
         // controller: 'PhoneListCtrl'
     }).
     when('/about', {
         templateUrl: 'courseApp/about.html'
         // controller: 'PhoneListCtrl'
     }).
     otherwise({
         redirectTo: '/home'
     });
}]);

app.controller("NavController", function ($scope, $http) {
    $scope.currentUser = null;
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        console.log("in server in app01");
        $http.get("/api/profile"+username)
        .success(function (response) {
            $scope.currentUser = response;
        });
    };
});
app.controller("ProfileController", function ($scope, $routeParams) {
    var username = $routeParams.username;

    //$scope.currentUser = UserService.getCurrentuser();
});