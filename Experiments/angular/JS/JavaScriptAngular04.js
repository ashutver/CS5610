var app = angular.module("CourseApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
     when('/home', {
         templateUrl: 'courseApp/home.html'
        // controller: 'PhoneListCtrl'
     }).
     when('/profile', {
             templateUrl: 'courseApp/profile.html'
             // controller: 'PhoneListCtrl'
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
}]) ;  
