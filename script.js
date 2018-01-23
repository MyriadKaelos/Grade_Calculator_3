var classes = 0;
var scoring = [["grade","<br>"],["weight","</td>"]];
var run = true;
$(function(){
    $("#addClass").click(function() {
        $(".tableHead").css("display","table-cell");
        addClass();
    });
});
function addClass() {
    classes ++;
    var tableRow = "<tr><td>Period " + classes + "</td>";
    for(var i = 0; i < 5; i++) {
        tableRow += "<td>";
        for(var t in scoring) {
            tableRow += scoring[t][0] + "<input id='" + scoring[t][0] + classes + i +
                "' value='0' type='number' max='100' min='0'>" + scoring[t][1];
        }
    }//makes each grade+weight box
    $("#myTable").append(tableRow);
}
function calculate() {
    run = true;
    for(var o = 0; o < classes; o++) {
        var gradeScore = 0;
        var weightSum = 0;
        for(var e = 0; e < 5; e++) {
            var grade = parseInt($("#grade" + (o + 1) + e).val());
            var weight = parseInt($("#weight" + (o + 1) + e).val());
            weightSum += weight;
            if(grade > 100 || grade < 0) {
                run = false;
                alert("You must have a valid Grade");
            }
            gradeScore += (grade * weight);
        }
        if(weightSum !== 0) {
            gradeScore /= weightSum;
        }
        if(weightSum > 100) {
            run = false;
            alert("Your weights for period " + (o + 1) + " should be less than 100 so that your final counts for anything!");
        }
        var gradeNeed = 90;
        while((gradeScore / 100 * weightSum) + (100 - weightSum) < gradeNeed) {
            gradeNeed -= 10;
        }
        var scoreNeed = (gradeNeed - (gradeScore / 100 * weightSum))/((100 - weightSum)/100);
        if(run === true) {
            alert("You must get a " + Math.round(scoreNeed) + "% on your final \nto get at least a " + gradeNeed + "% on your period " + (o + 1) + " course.");
        }
    }
}