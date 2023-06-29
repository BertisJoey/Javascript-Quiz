//the beginning contains all the necessary variables
var startContainerEl = document.getElementById("start-container");
var questionContainerEl = document.getElementById("question-container");
var endContainerEl = document.getElementById("end-container");
var btnStartQuiz = document.getElementById("startQuiz");
var questionDiv = document.getElementById("question");
var timer = document.getElementById("timer");
var answerButtons = document.getElementById("answer-buttons");
var finalScoreEl = document.getElementById("final-score");
var initialsForm = document.getElementById("initials-form");
var initials = document.getElementById("initials-input");
var btnSubmit = document.getElementById("submit-score");
var ulCreate = document.createElement("ul");

//randomizedQuestions starts as undefined, the next few variables start with a specific value
var randomizedQuestions
var questionIndex = 0;

var score = 0;
var remainingTime = 45;


//creating an array for the questions
var questions = [
    {
        title: "Arrays in javascript can be used to store what?",
        choices: [
            {text: "Booleans"}, 
            {text: "Other Arrays"},
            {text: "Strings and Numbers"},
            {text: "All of the above"}
        ],
        answer: "All of the above",
    },
    {
        title: "DOM stands for ___",
        choices: [
            {text: "Document Object Model"},
            {text: "Document Object Method"},
            {text: "Determined Original Model"},
            {text: "Dominating the HTML"}
        ],
        answer: "Document Object Model",
    },
    {
        title: "Javascript is considered a/an ____-based programming language.",
        choices: [
            {text: "variable"},
            {text: "function"},
            {text: "object"},
            {text: "None of the above"}
        ],
        answer: "object",
    },
    {
        title: "Which of the follow is an exampe of proper syntax to create a function named 'myFunction'?",
        choices: [
            {text: "if (myFunction())"},
            {text: "function = myFunction()"},
            {text: "this is my function called myFunction"},
            {text: "function myFunction()"}
        ],
        answer: "function myFunction()",
    },
    {
        title: "Which of the following methods is used for the purposes of local storage?",
        choices: [
            {text: "querySelectorAll"},
            {text: "var ="},
            {text: "getItem"},
            {text: "getElementById"}
        ],
        answer: "getItem",
    }
]
function setTime() {
var startTimer = setInterval(function() {
    timer.innerText = remainingTime;
    remainingTime --;
    if (remainingTime <= 0) {
        timer.innerText = "Time is up!";
        remainingTime = 0; 
        endQuiz();
    } else if (questionIndex >= questions.length) {
        clearInterval(startTimer);
    }
}, 1000)
};


//start the quiz function
var quizStart = function() {;
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");

    randomizedQuestions = questions.sort(() => Math.random() - 0.5);
    setQuestion();
    setTime();
}

//the following was found to be necessary otherwise the questions would contain the answer buttons from previous questions
var resetAnswers = function() {
    answerButtons.innerText = "";
}

//the following functions determine which question to ask and then generate it for the user
var setQuestion = function() {
    resetAnswers();
    displayQuestion(randomizedQuestions[questionIndex]);
}
var displayQuestion = function(index) {
    questionDiv.innerText = index.title
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].text
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", checkAnswer)
        answerButtons.appendChild(answerbutton)
        }
};

//the following functions are called to determine whether the answer given was correct or not, the first compares the answer to the questions array and the next two mark them down as correct or wrong
var checkAnswer = function(event) {
    var givenAnswer = event.target;
    if (randomizedQuestions[questionIndex].answer === givenAnswer.innerText) {
        correctAnswer();
    }
    else {
        wrongAnswer();
    }

    questionIndex++
    if (questionIndex >= questions.length) {
        endQuiz();
    } else {
        setQuestion();
    }
};

var correctAnswer = function() {
    score = score + 5;
}
var wrongAnswer = function() {
    remainingTime = remainingTime - 10;
}

//the following is called to end the quiz
var endQuiz = function() {
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    endContainerEl.classList.remove("hide");

    var finalScore = score + remainingTime;
    finalScoreEl.innerText = finalScore
}

//the following adds an event listener to start the quiz
btnStartQuiz.addEventListener("click", quizStart);

//the following adds an event listener for the submit button on the initials and score page
btnSubmit.addEventListener("click", function(event) {
    event.preventDefault();

    var storedScore = {
        initials: initials.value,
        score: finalScoreEl.innerText
    };

    var allHighScores = localStorage.getItem("allHighScores");
    if (allHighScores === null) {
        allHighScores = [];
    } else {
        allHighScores = JSON.parse(allHighScores);
    }
    allHighScores.push(storedScore);
    localStorage.setItem("allHighScores", JSON.stringify(allHighScores));

    //the following sends the user to the second html page after hitting submit and after the data is locally stored
    window.location.href = "./highscores.html";
});