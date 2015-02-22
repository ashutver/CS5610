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

app.controller("ProfileController", function ($scope, UserService, $routeParams, CourseService) {
    var username = $routeParams.username;
    $scope.username = username;
    var currentuser = UserService.getCurrentuser();
    $scope.currentUser= currentuser;
   
    if (currentuser.role == "professor") {
        $scope.teaching = CourseService.getCourseByIndices(currentuser.teaching);
        //console.log($scope.teaching);
    } else if (currentuser.role == "student") {
        $scope.registered = CourseService.getCourseByIndices(currentuser.registered);
    }
});

app.controller("NavController", function ($scope, UserService) {
    $scope.currentUser = null;
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        // console.log(username);
        $scope.currentUser=UserService.login(username, password);
     }
    $scope.logout = function () {
        $scope.currentUser = null;
        UserService.logout();
        $scope.username = null;
        $scope.password = null;
    }
});
app.factory("UserService", function () {
    var currentuser = null;
    var users = [
        { username: "john", password: "john", role: "admin" },
        { username: "mike", password: "mike", role: "professor", teaching:[3,2] },
        { username: "roy", password: "roy", role: "student" , registered:[1,2] }
    ];

   
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
    var logout = function () {
           currentUser = null;
    }
    return {
        login: login,
        getCurrentuser: getCurrentuser,
        logout: logout
    }
});
app.factory("CourseService", function () {
    var courses = [
       { title: "PDP" },
       { title: "Information Retrieval" },
       { title: "Web dev" },
       { title: "Algo" }
    ];
    var addCourse = function (course) {
        courses.push(course);
    };
    var getCourseByIndex = function (index) {
        return courses[index];
    };
    var getCourseByIndices = function (indices) {
        var responseCourses = [];
        for (var i in indices) {
            var course = courses[indices[i]];
            responseCourses.push(course);
        }
        return responseCourses;
    };
    return {
        addCourse: addCourse,
        getCourseByIndex: getCourseByIndex,
        getCourseByIndices: getCourseByIndices

    }
});
