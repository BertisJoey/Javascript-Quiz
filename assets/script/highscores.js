var highScoresContainer = document.getElementById("highscores-container");
var highScoreEl = document.getElementById("highscore-list");
var btnGoBack = document.getElementById("go-back");
var btnClear = document.getElementById("clear-scores");


var allHighScores = localStorage.getItem("allHighScores");
allHighScores = JSON.parse(allHighScores);

var generateHighScores = function() {
    for (var i = 0; allHighScores.length; i++) {
        var highScoreLi = document.createElement("li");
        highScoreLi.textContent = allHighScores[i].initials + " " + allHighScores[i].score;
        highScoreEl.appendChild(highScoreLi);
    }

}

function init() {
    generateHighScores();
};

btnGoBack.addEventListener("click", function() {
    window.location.href = "./index.html";
});
btnClear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});


init();
