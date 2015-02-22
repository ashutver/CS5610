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

app.controller("ProfileController", function ($scope, UserService,$routeParams) {
    var username = $routeParams.username;
    $scope.currentUser = UserService.getCurrentuser();
});

app.controller("NavController", function ($scope, UserService) {
    $scope.currentUser = null;
    $scope.login = function () {
     
        var username = $scope.username;
        var password = $scope.password;
        // console.log(username);
        $scope.currentUser=UserService.login(username, password);
       
    }
    
});
app.factory("UserService", function () {
    var currentuser = null;
    var users = [
        { username: "john", password: "john" },
        { username: "mike", password: "mike" },
        {username:"roy" , password:"roy"}
    ]
    var login = function(username,password){
        for(var u in users)
        {
            if(users[u].username == username)
            {
                currentuser = users[u];
                return users[u];
            }
        }
        return null;
    };
    var getCurrentuser = function () {
        return currentuser;
    }
    return {
        login: login,
        getCurrentuser: getCurrentuser
    }
});
