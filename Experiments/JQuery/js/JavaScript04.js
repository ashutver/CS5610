$(function () {
    $(".Indian").click(addContentIndian);
    $(".American").click(addContentAmerican);
    $(".Chinese").click(addContentChinese);
    $(".Italian").click(addContentItalian);
    $("h1").click(function (event) {
        console.log(event);
    });
    $("#addContent").click(addNewCuisine);
   
    function addContentIndian() {
        $(".content").empty().html(
              $("div").filter(".Indian-Content").html());
    }
    function addContentAmerican() {
        $(".content").empty().html(
                      $(".American-Content").html());
    }
    function addContentChinese() {
        $(".content").empty().html(
                      $(".Chinese-Content").html());
    }
    function addContentItalian() {
        $(".content").empty().html(
                      $(".Italian-Content").html());
    }
    
    function addNewCuisine() {
        var div1 = $("<div> <p> Enter Cuisine Name <p><div>");
        var div2 = $("<div> <p> Enter Cuisine Details <p><div>");
        var element1 = document.createElement("input");
        var element2 = document.createElement("input");
        console.log("inside");
        $(".newContent").append(div1)
                        .append(element1)
                        .append(div2)
                        .append(element2);
    }
});