app.controller("LoginCtrl", function ($scope, $http, $location, $rootScope, $modalInstance) {
    $scope.login = function (user) {
        //console.log(user);
        $http.post("/api/login", user)
         .success(function (response) {
             $rootScope.currentUser = response;
             $location.url("/profile/");
             $modalInstance.close();
         })
         .error(function (response) {
             console.log(response);
         });
     };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});