$(function () {
    $(".Indian").click(addContentIndian);
    $(".American").click(addContentAmerican);
    $(".Chinese").click(addContentChinese);
    $(".Italian").click(addContentItalian);
    $("h1").click(function (event) {
        console.log(event);
    });
    function addContentIndian() {
     //   var div =$("div").attr("contenteditable", true);
        $(".content").empty().html(
              $("div").filter(".Indian-Content").attr("contenteditable", true));
      //  $(".content").attr("contenteditable", true);
    }
    function addContentAmerican() {
        $(".content").empty().html(
             $("div").filter(".American-Content")
                     .attr("contenteditable", true));
                    
    }
    function addContentChinese() {
        $(".content").empty().html(
             $("div").filter(".Chinese-Content")
                     .attr("contenteditable", true));
                   
    }
    function addContentItalian() {
        $(".content").empty().html(
             $("div").filter(".Italian-Content")
                     .attr("contenteditable", true));
                     
    }
});