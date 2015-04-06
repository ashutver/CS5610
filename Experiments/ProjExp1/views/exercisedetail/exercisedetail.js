app.controller("exrcsDetCtrl", function ($scope, $http, $rootScope, $routeParams, ExerciseService) {
    var exerciseid = $routeParams.id;  // id of particular exercise
    var images = ExerciseService.getImages();
    var userId =null;
    if ($rootScope.currentUser != null) {
        console.log("userid is not null");
        userId = $rootScope.currentUser._id;
    }
   
    $scope.exerciseImage = [];
    console.log(exerciseid);
    $scope.exercise = null;
    var mainMuscles = [];
    var secMuscles = [];
    $scope.frontMuscle = [];
    $scope.backMuscle = [];
    $scope.frontMuscleUrl = "";
    $scope.backMuscleUrl = "";
    $scope.users = [];
    $scope.user = null;
    $scope.comments = [];

    $http.get("/api/users/")
    .success(function (response) {
        $scope.users = response;
       // console.log(userId);
        if (userId == null || typeof userId == 'undefined') {
            $scope.user = { pic: "/ProjExp1/views/exercisedetail/dummy.png" };
        } else {
            for (var u in $scope.users) {
                if ($scope.users[u]._id = userId) {
                    $scope.user = $scope.users[u];
                   // console.log($scope.user);
                    if ($scope.user.pic == null) {
                        $scope.user.pic = "/ProjExp1/views/exercisedetail/dummy.png" ;
                    }
                }
            }
        }
        console.log($scope.user);
    });
    $http.get("http://wger.de/api/v2/exercise/" + exerciseid + "?&callback=JSON_CALLBACK")
       .success(function (response) {
           $scope.exercise = response;
           for (var i in images) {
               if (images[i].exercise == exerciseid) {
                   $scope.exerciseImage.push("https://wger.de/media/" + images[i].image);
               }
           }
           mainMuscles = $scope.exercise.muscles; //"muscles": [  5  ], 
           secMuscles = $scope.exercise.muscles_secondary;
           $http.get("http://wger.de/api/v2/muscle/?format=json&limit=17&callback=JSON_CALLBACK")
            .success(function (response) {
                var muscles = response.results;
                for (var m in mainMuscles) {
                    for (var n in muscles) {
                        if (mainMuscles[m] == muscles[n].id) {
                            if (muscles[n].is_front === true) {
                                $scope.frontMuscle.push('http://wger.de/static/images/muscles/main/muscle-' + mainMuscles[m] + '.svg')
                            } else {
                                $scope.backMuscle.push('http://wger.de/static/images/muscles/main/muscle-' + mainMuscles[m] + '.svg')
                            }
                        }
                    }
                }
                for (var s in secMuscles) {
                    for (var m in muscles) {
                        if (secMuscles[s] == muscles[m].id) {
                            if (muscles[m].is_front === true) {
                                $scope.frontMuscle.push('http://wger.de/static/images/muscles/secondary/muscle-' + secMuscles[s] + '.svg')
                            } else {
                                $scope.backMuscle.push('http://wger.de/static/images/muscles/secondary/muscle-' + secMuscles[s] + '.svg')
                            }
                        }
                    }
                }
                $scope.frontMuscleUrl = "background-image:";
                for (var f in $scope.frontMuscle) {
                    $scope.frontMuscleUrl = $scope.frontMuscleUrl + "url(" + $scope.frontMuscle[f] + "),"
                }
                $scope.frontMuscleUrl = $scope.frontMuscleUrl + "url(http://wger.de/static/images/muscles/muscular_system_front.svg)";

                $scope.backMuscleUrl = "background-image:";
                for (var f in $scope.backMuscle) {
                    $scope.backMuscleUrl = $scope.backMuscleUrl + "url(" + $scope.backMuscle[f] + "),"
                }
                $scope.backMuscleUrl = $scope.backMuscleUrl + "url(http://wger.de/static/images/muscles/muscular_system_back.svg)";
            });
       });
    
    $scope.saveComment = function () {
        var comment = { commentdesc: $scope.data, userid: userId };
        $scope.comments.unshift(comment);
        console.log($scope.comments);
        var exercise = { exerciseid: exerciseid, comment: $scope.comments };
        console.log(exercise);
        $http.post("/api/exercisecomment/" + exerciseid, exercise)
        .success( function(response){
            console.log(response);
        });
        $scope.data = null;
        // for display purpose only
        for (var u in $scope.users) {
            if ($scope.users[u]._id == userId) {
                $scope.comments[0].pic = $scope.users[u].pic;
                $scope.comments[0].username = $scope.users[u].username;
                $scope.comments[0].creationdate = Date.now;
                $scope.commentslength = $scope.comments.length;
                break;
            }
        }
        // saving to user table
       // $http.put("/api/usercommentupdate")
    }
    $http.get("/api/exercisecomment/" + exerciseid)
    .success(function (response) {
        if ( response.length > 0) {
            console.log(response[0].comment);
            $scope.comments = response[0].comment;
            $scope.commentslength = $scope.comments.length;
            for (var c in $scope.comments) {
                for (var u in $scope.users) {
                    if ($scope.users[u]._id == $scope.comments[c].userid) {
                        $scope.comments[c].pic = $scope.users[u].pic;
                        $scope.comments[c].username = $scope.users[u].username;
                        console.log($scope.comments[c].username);
                        break;
                    }
                }
            }
        }
    });
});
