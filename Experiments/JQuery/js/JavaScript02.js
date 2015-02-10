$(function () {
    $(".Indian").click(addContentIndian);
    $(".American").click(addContentAmerican);
    $(".Chinese").click(addContentChinese);
    $(".Italian").click(addContentItalian);
    $("h1").click(function (event) {
        console.log(event);
    });
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
});