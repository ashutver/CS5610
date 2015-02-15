$(function () {
    $(".exercise").change(function () {
        
        $.ajax({
            url: "https://wger.de/api/v2/exercise/?format=json&language=2&&limit=5&category=" + $(".exercise").val(),
            success: renderExercises
        });
    });
    
});
function renderImage(id) {
    $.ajax({
        url: "https://wger.de/api/v2/exercise/?format=json&language=2&category=" + $(".exercise").val(),
        success: renderExercises
    }); 
}
function renderExercises(exercises) {
   
     var parent = $("#Exercises");
     var template = parent.find(".template");
     parent.empty();
     var results =exercises.results; 
     for (var m in results) {
        var exer = results[m];
        var title = exer.name;
        var desc = exer.description;
       
        var item = template.clone();
        item.find(".title").html(title);
        item.find(".plot").html(desc);
        parent.append(item);
       
        var id = exer.id;
       
    }
}