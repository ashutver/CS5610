app.controller("workdetCtrl", function ($scope, $http, $location, $rootScope, $routeParams, $modal) {

  /*  var userId = null;
    $scope.userId = null;
    
    if ($rootScope.currentUser != null) {
        console.log("userid is not null");
        userId = $rootScope.currentUser._id;
    }*/
    var id = $routeParams.id; // workout id
    //console.log(id);
   
    $http.get("/api/workoutdetail/" + id )
    .success(function (response) {
        $scope.workout = response;
        console.log("data"+$scope.workout);
    });
    $scope.days = null;
    var weekday = [];
    var fetchDaysForWorkout = function (id) {
        $http.get("/api/days/" + id)    // fetch days for a workout id
        .success(function (response) {
            $scope.days = response;
            $http.get("http://wger.de/api/v2/daysofweek/?format=json&limit=7&callback=JSON_CALLBACK")
            .success(function (response) {
                namingdays($scope.days, response.results);
            });
            //console.log("days " +response);
        });
    }
    fetchDaysForWorkout(id);
    var namingdays = function(daysScope ,results ){
        for (day in daysScope) { // returns a array
        //    for (day in daysScope[days]) {   //element of ths array
                for (wd in results) {
                    if(daysScope[day][0] == results[wd].id){
                        console.log(daysScope[days][day]);
                        weekday.push(results[wd].day_of_week);
                    }
              //  }
            }
            daysScope[day].weekday = weekday;
        }
        $scope.days=daysScope;
    }
    function addDay() {
        var description = $("#id_desc").val();
        var days = $("#id_day").val();
        console.log("desc" + description);
       // console.log("days" + days);
        var day = { workoutid: id, description: description, days: days };
        $http.post("/api/days/" , day)
        .success(function (response) {
            $scope.days = response;
        })
    }

    /*  for adding exercises, used in dropdown */
    var oldExercises = [];
    var exercisesWithCategories = [];
    $http.get("http://wger.de/api/v2/exercise/?format=json&limit=170&language=2&callback=JSON_CALLBACK")
   .success(function (response) {
       $scope.exercises = response.results;
       console.log($scope.exercises.length);
       oldExercises = $scope.exercises;
       var categories = null;
       $http.get(" https://wger.de/api/v2/exercisecategory/?format=json&callback=JSON_CALLBACK")
       .success(function (response) {
           categories = response.results;
           var exercise = null;
           for (var e in oldExercises) {
               exercise = oldExercises[e];
               for (var cat in categories) {
                   if (exercise.category == categories[cat].id) {
                       exercise.label = exercise.name;
                       exercise.category = categories[cat].name;
                       exercisesWithCategories.push(exercise);
                       //  console.log(exercise.category);
                       break;
                   }
               }
           }
           console.log(exercisesWithCategories.length);
          // console.log(exercisesWithCategories[0].name + " " + exercisesWithCategories[0].label);
       });

   });
    function addexercise() {
        console.log("exercisename:" + $(id_exer).val());
        console.log("sets:" + $(id_sets_value).val());
        console.log("value:" + $scope.repetitions);
        var exercisename = $(id_exer).val();
        var sets = $(id_sets_value).val();
        var repetitions = $scope.repetitions;
        var index = $scope.record;
        var day = $scope.days[index];
        console.log(day);
        var exercises = day.exercises;
        var exercise = { exercisename: exercisename, sets: sets, reps: repetitions };
        exercises.push(exercise);
        console.log(exercises);
        
        $http.post("/api/adddays/" + day._id, exercises)
        .success(function (response) {
            fetchDaysForWorkout(id);
        });
       
    }
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },
        _renderMenu: function (ul, items) {
            var that = this,
              currentCategory = "";
            $.each(items, function (index, item) {
                var li;
                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.attr("aria-label", item.category + " : " + item.label);
                }
            });
        }
    });
    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'content.html',
           // controller: 'LoginCtrl',
        });
    }

    /*-----------------------*/

    $(function () {
        var dialog, form, dialog1;
        dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 400,
            width: 500,
            modal: true,
            buttons: {
                //"Create an account : addUser,"
                "Save": function () {
                    addDay();
                    dialog.dialog("close");
                },
                Cancel: function () {
                    dialog.dialog("close");
                }
            }
        });
        dialog1 = $("#dialog-form1").dialog({
            autoOpen: false,
            height: 600,
            width: 500,
            modal: true,
            buttons: {
                //"Create an account : addUser,"
                "Save": function () {
                    addexercise();
                    dialog1.dialog("close");
                },
                Cancel: function () {
                    dialog1.dialog("close");
                }
            }

        });
        $("#create-day").button().on("click", function () {
            dialog.dialog("open");
        });
        $("a#create-day").click(function (e) {
            console.log("inside day");
            dialog.dialog("open");
        });
       
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            $(".create-exercise1").click(function (e) {
                console.log($(e.target));
                $scope.record = $(e.target).index();
                dialog1.dialog("open");
                //   alert($(e.target).val());
            });
            $(".create-exercise").button().on("click", function () {
               // console.log("button");
                dialog1.dialog("open");
            });
        });
       
       
        $("#id_exer").catcomplete({
            delay: 0,
            source: exercisesWithCategories
        });
        $("#slider").slider({
            value: 4,
            min: 0,
            max: 10,
            step: 1,
            slide: function (event, ui) {
                $("#id_sets_value").val(+ui.value);
            }
        });
        $("#id_sets_value").val($("#slider").slider("value"));
    });
   
});

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});