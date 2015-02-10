$(function () {
   
    $(".Indian-Cuisine").mouseenter(displayPicIndian);
    function displayPicIndian() {
        $(".showPic").empty().html(
            $(".Indian").html());
     }
    $(".American-Cuisine").mouseenter(displayPicAmerican);
    $(".Chinese-Cuisine").mouseenter(displayPicChinese);
    $(".Italian-Cuisine").mouseenter(displayPicItalian);
    function displayPicAmerican() {
        $(".showPic").empty().html(
            $(".American").html());
    }
    function displayPicChinese() {
        $(".showPic").empty().html(
         $(".Chinese").html());
    }    
    function displayPicItalian() {
        $(".showPic").empty().html(
        $(".Italian").html());
    }
});