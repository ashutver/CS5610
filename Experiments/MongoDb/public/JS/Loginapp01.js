var app = angular.module("LoginApp", []);



app.controller("loginController", function ($scope, $http) {
    var currentUser = null;
    $http.get("/api/user")
        .success(function (response) {
            $scope.courses = response;
        });
    /*   $scope.remove = function (id) {
           $http.delete("/api/course" + id)
           .success(function (response) {
               $scope.courses = response;
           })
       };*/
    $scope.login = function (user) {
        $http.post("/api/user", user)
        .success(function (response) {
            if (response != null) {
                $scope.currentUser = response;
               // console.log("here" + response);
            }
        })
    };

    function addUser() {
        var name = $("#name").val();
      
        var password = $("#name").val();
        var email = $("#name").val();
        $http.post("/api/user/add", { userName: name, password: password, email: email })
        .success(function (response) {
            $scope.currentUser = response;
        });
      
    };

    $(function () {
        var dialog, form;
        dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 370,
            width: 400,
            modal: true,
            buttons: {
                //"Create an account : addUser,"
                "Create an account":function(){
                    addUser();
                    dialog.dialog("close");
                  },
                    Cancel: function () {
                    dialog.dialog("close");
                 }
            }
           
        });
    $("#create-user").button().on("click", function () {
            dialog.dialog("open");
        });
    });
});

    