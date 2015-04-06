app.controller("exrcsCtrl", function ($scope, $http, $location, $rootScope, $routeParams, UserService) {

    //  var userId = $rootScope.currentUser._id;
    var value = 8;
    var exercises = UserService.getExercises();
    if (typeof exercises == 'undefined') {
        console.log(here);
        $http.get("http://wger.de/api/v2/exercise/?format=json&limit=170&language=2&callback=JSON_CALLBACK&ordering=name")
       .success(function (response) {
        exercises = response.results;
        console.log(exercises.length);
       });
    }
    var images = UserService.getImages();
    console.log(images);
  //  var exerciseImages = [];  // $scope.hello = "hii";
    $scope.categoryExercises = [];
    mappingExerciseImages();
    changeExercises(value);
    
    function mappingExerciseImages() {
        console.log("list length" + exercises.length);
        for (var e in exercises) {
            var flag = false;
            for (var i in images) {
                if (exercises[e].id == images[i].exercise) {
                    console.log("hello")
                    console.log(exercises[e].id);
                    console.log(images[i].exercise);
                    exercises[e].images = "https://wger.de/media/" + images[i].image;
                    console.log(exercises[e].images);
                    flag = true;
                    break;
                }
                if (flag == false) {
                    exercises[e].images = "/ProjExp1/views/exercise/image-placeholder.svg";
                    // exercises[e].images = { "thumbnail": { url: "/ProjExp1/views/exercise/image-placeholder.svg" } };
                }
            }
           
        }
        for (var e in exercises) {
            console.log(exercises[e].images);
        }
    }
    function changeExercises(value) {
        $scope.categoryExercises = [];
       // console.log($scope.categoryExercises.length);
        //console.log("value" + " "+value);
        //console.log(value);
        for (var e in exercises) {
            if (exercises[e].category == value) {
                
                $scope.categoryExercises.push(exercises[e]);
               // console.log("current src="+exercises[e].images.thumbnail.url);
            }
        }
        console.log($scope.categoryExercises[0]);
    }
   
    $scope.link_back = function () {
        changeExercises(12);
      }
    $scope.link_arms = function () {
        changeExercises(8);
    }
    $scope.link_legs = function () {
        console.log("legs")
        changeExercises(9);
    }

    $(function () {
        
        $("#content").tabs();
       
    });
});

