app.controller("nutriCtrl", function ($scope, $http, $location, $rootScope, $routeParams, ExerciseService) {

    $scope.filteredTodos = [],
     $scope.currentPage = 1,
     $scope.numPerPage = 30, // items to be displayed on a page
     $scope.maxSize = 5,   // pagination limit to be shown
     $scope.nutritients = [];
    $scope.nutrientsname = [];  //names to be shown in autocomplete

    var loadPage = function (pageno) {
        console.log(pageno);
        $http.get("http://wger.de/api/v2/ingredient/?format=json&limit=30&page=1&callback=JSON_CALLBACK&ordering=name&page="+pageno)
           .success(function (response) {
        $scope.filterednutrients = response.results;
        console.log("done");
       });
    }
    loadPage(1);

    var nutrients = ExerciseService.getNutrients();
    console.log(nutrients.length);
      for (var n in nutrients) {
             $scope.nutrientsname.push(nutrients[n].name);  // require names here
       }
     
    $scope.select = function(index){
        console.log(index);
    }
  
   $scope.numPages = function () {
       return 278;
    };

    $scope.$watch('currentPage + numPerPage', function () {
       // var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        //, end = begin + $scope.numPerPage;

        //$scope.filterednutrients = $scope.nutritients.slice(begin, end);
        loadPage($scope.currentPage);
    });
    var movetodetail = function (name) {
        console.log(name);
        var id = null;
        for (var n in nutrients) {
            if (nutrients[n].name == name) {
                 id = nutrients[n].id;
                console.log(id);
                break;
            }
        }
        console.log("in movetodetail");
        $location.url("/exercise/" + id);
       // console.log($location.url("/nutrition/" + id));
        //$location.url("")
    }
   
    $(function () {
       
        $("#ingredient-search").autocomplete({
            source: $scope.nutrientsname,
            select: function (event, ui) {
                //  console.log(this.value);  prints written value
              //  console.log(ui.item.value);
                //   console.log(ui.item.labemovel);
               // $(this).val(ui.item.value);
                movetodetail(ui.item.value);
                $location.url("/nutrition/ui.item.value");
            }
        });
    });
});

