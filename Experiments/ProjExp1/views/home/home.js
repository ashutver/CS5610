
app.controller("homeCtrl", function ($scope, $http, $location, $rootScope) {

    $scope.myInterval = 5000;
    var slides = [];
    slides.push({
        image: "/ProjExp1/motivation.jpg"
    });
    slides.push({
        image: "/ProjExp1/bicep.jpg"
    });
    slides.push({
        image: "/ProjExp1/fitness.png"
    });
    slides.push({
        image: "/ProjExp1/Hrithik.jpg"
    });
   
    $scope.slides = slides;
});