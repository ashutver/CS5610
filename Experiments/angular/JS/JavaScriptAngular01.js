var app = angular.module("ExerciseApp", []);

app.controller("ExerciseController",
    function ($scope) {
        // alert("hello");
      
        var exercises = [
            { title: "Bench Press", desc: "chest", category: "chest" },
            { title: "Shoulder Press", desc: "shoulder", category: "shoulder" }
        ];
        $scope.exercises = exercises;
        $scope.removeExercise = function (exercise) {
            var index = $scope.exercises.indexOf(exercise);
            $scope.exercises.splice(index, 1);
        }
        $scope.addExercise = function () {
            // alert($scope.exercise.title);
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