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
    $scope.currentUser = currentuser;

    $scope.removeCourse = function (index) {
        UserService.removeCourse(index);
        //need to refresh
        $scope.currentUser = UserService.getCurrentuser();
        console.log($scope.currentUser);
        if (currentuser.role == "professor") {
            $scope.teaching = CourseService.getCourseByIndices($scope.currentUser.teaching);
            $scope.remainingCourses = UserService.getRemainingCourses();
        } else if (currentuser.role == "student") {
            $scope.registered = CourseService.getCourseByIndices(currentuser.registered);
            $scope.remainingCourses = UserService.getRemainingCourses();
        }
    }

    $scope.addCourse = function (course) {
        UserService.addCourse(course);
        if (currentuser.role == "professor") {
            $scope.teaching = CourseService.getCourseByIndices($scope.currentUser.teaching);
            $scope.remainingCourses = UserService.getRemainingCourses();
            //console.log($scope.teaching);
        } else if (currentuser.role == "student") {
            $scope.registered = CourseService.getCourseByIndices($scope.currentUser.registered);
            $scope.remainingCourses = UserService.getRemainingCourses();
        }
    }
  
        if (currentuser.role == "professor") {
            $scope.teaching = CourseService.getCourseByIndices($scope.currentUser.teaching);
            $scope.remainingCourses = UserService.getRemainingCourses();
            //console.log($scope.teaching);
        } else if (currentuser.role == "student") {
            $scope.registered = CourseService.getCourseByIndices($scope.currentUser.registered);
            $scope.remainingCourses = UserService.getRemainingCourses();
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
app.factory("UserService", function (CourseService) {
    var currentuser = null;
    var users = [
        { username: "john", password: "john", role: "admin" },
        { username: "mike", password: "mike", role: "professor", teaching:[2,3] },
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
           currentuser = null;
    }

    var removeCourse = function (index) {
        if (currentuser.role == "professor") {
            currentuser.teaching.splice(index, 1);
          
        } else if (currentuser.role == "student") {
           currentuser.registered.splice(index, 1);
        }

    }
    var getRemainingCourses = function () {
        var remainingCourses = [];
        if (currentuser.role == "professor") {
            remainingCourses = CourseService.getRemainingCourses(currentuser.teaching);

        } else if (currentuser.role == "student") {
            remainingCourses = CourseService.getRemainingCourses(currentuser.registered);
        }
      
        return remainingCourses;
    }
    var addCourse = function(course){
        if (currentuser.role == "professor") {
            currentuser.teaching.push(CourseService.getCorrectIndexForCourse(course));

        } else if (currentuser.role == "student") {
          //  currentuser.registered.push(index);
            currentuser.registered.push(CourseService.getCorrectIndexForCourse(course));
        }


    }

    return {
        login: login,
        getCurrentuser: getCurrentuser,
        logout: logout,
        removeCourse: removeCourse,
        getRemainingCourses: getRemainingCourses,
        addCourse: addCourse
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
    var getRemainingCourses = function (indices) {
        var remainingCourses = [];
        for (var i in courses) {
        //    console.log("getRemainingCourses:" + i);
            var flag = contains(indices , i);
         //   console.log("flag:" + flag);
            if ( !flag) {
                console.log("course no"+i);
                console.log(courses[i]);
                remainingCourses.push(courses[i]);
            }
        }
        return remainingCourses;
    }
    var getCorrectIndexForCourse = function (course) {
        for (i in courses) {
            if (course == courses[i]) {
                console.log("logic worked");
            return i;
             }
        }
    }
    var contains = function (a, obj) {
       console.log("contains:" + a + " obj:" +obj);
          for (var i = 0; i < a.length; i++) {
              if (a[i] == obj) {
                  console.log("true");
                return true;
            }
        }
        return false;
       }
    
    return {
        addCourse: addCourse,
        getCourseByIndex: getCourseByIndex,
        getCourseByIndices: getCourseByIndices,
        getRemainingCourses: getRemainingCourses,
        getCorrectIndexForCourse: getCorrectIndexForCourse
      

    }
});
