var app = angular.module("ExerciseApp", []);

app.controller("ExerciseController",
    function ($scope,$http) {
       
        $http.get("http://wger.de/api/v2/exercise/?format=json&language=2&limit=5&callback=JSON_CALLBACK")
        .success(function (response){
            $scope.exercises = response.results;
        /*    function ($scope, $http) {
                $http.get("http://wger.de/api/v2/exercisecategory/?format=json&id="+$scope.exercise.id+"&callback=JSON_CALLBACK")
                       .success(function (response){
                           $scope.exercise.newC =response.res.name;
                       });
                }*/
        });
        $scope.favoriteMovies = [];
        $scope.addToFovorites = function (exercise) {
            $scope.favoriteMovies.push(exercise);
        }
        $scope.removeFavExercise = function (exercise) {
            var index = $scope.favoriteMovies.indexOf(exercise);
            $scope.favoriteMovies.splice(index, 1);
        }
      
        $scope.removeExercise = function (exercise) {
            var index = $scope.exercises.indexOf(exercise);
            $scope.exercises.splice(index, 1);
        }
        $scope.addExercise = function () {
           
            var newExercise = {
                title: $scope.exercise.title,
                desc: $scope.exercise.desc,
                category: $scope.exercise.category
            };
            $scope.exercises.push(newExercise);
        }
        $scope.selectExercise = function (exercise) {
            $scope.exercise = exercise;
        }
});