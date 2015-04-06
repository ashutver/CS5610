app.controller("ProfileController", function ($scope, $http, $location, $rootScope, $routeParams) {
    var userId = $rootScope.currentUser._id;
    if ($routeParams.id != null) {
        userId = $routeParams.id;
    }

    $http.get("/api/famousworkout_excludingcurrentuser/" + userId)
          .success(function (response) {
              $scope.followedWorkouts = response;
          });
    $http.get("/api/followingworkout/" + userId)
      .success(function (response) {
          $scope.followingworkouts = response;
        //  console.log($scope.followedworkouts);
      });
    // functionality for unfollow
    $scope.unfollow = function (workoutid) {
        var user = { userId: userId };
        console.log("in unfollow");
        $http.get("/api/workoutid/" + workoutid)
       .success(function (response) {
           response[0].followersid.splice(userId);
           var followerdata = { followersid: response[0].followersid, userId: userId, followers: response[0].followers - 1 };
           followUnfollow(workoutid, followerdata)
       });
    }
    var followUnfollow = function (workoutid, followerdata) {
        $http.put("/api/workoutupdate/" + workoutid, followerdata)
       .success(function (response) {
           console.log("response");
           console.log(response);
           $scope.followingworkouts = response;
           
       });
    }

});