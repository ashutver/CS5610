$(function () {
    $.ajax({
        url: "https://wger.de/api/v2/exercise/?format=json&language=2&limit=5",
        success: renderExercises
    });
});
function renderExercises(exercises) {
    console.log(exercises);
    var ul = $("#Exercises");
    ul.empty();
    var results =exercises.results; 
    for (var m in results) {
        var exer = results[m];
        var title = exer.name;
        var desc = exer.description;
        var p = $("<p>").append(desc);
       // console.log(title);
        var li = $("<li>").append(title)
                           . append(p);
        ul.append(li);
    }
}