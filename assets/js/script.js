/* BEGIN VARIBLE DECLARATIONS */

//create the quiz questions, answers, and correct answers as an array
quizQuestions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with:",
        answers: [
            "quotes",
            "curly braces",
            "parenthesis",
            "square brackets"
        ],
        correctAnswer: "parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables",
        answers: [
            "commas",
            "curly braces",
            "quotes",
            "parenthesis"
        ],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log"
        ],
        correctAnswer: "console.log"
    }
]
var pageContentEl = document.querySelector(".page-content");
var pageContentHeaderEl = document.querySelector(".page-content-header");
var pageContentBodyEl = document.querySelector(".page-content-body");
var startQuizEl = document.querySelector("#start-quiz-btn");
var startQuizElById = document.getElementById("#start-quiz-btn");
var footerEl = document.querySelector(".footer");
var highScoreMessage = "Go back or clear high scores buttons";
var i = 0;

/* END VARIBLE DECLARATIONS */

// TODO: View high scores, uppoer left hand corner
// TODO: Timer, upper right corner

/* BEGIN FUNCTION DECLARATIONS */

var displayWelcome = function () {
    console.log("displayWelcome: Displaying welcome screen");

    pageContentHeaderEl.textContent = "Coding Challenge Quiz";    
    pageContentBodyEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startQuizEl.textContent = "Start Quiz";

}

var displayQuestionAndAnswers = function () {
    console.log("displayQuestionAndAnswers: Displaying question at iteration: " + i);
    //clear any existing text and hide start quiz button
    pageContentBodyEl.textContent = "";
    startQuizEl.setAttribute("style", "display:none");

    //set the h1 to the text of the question
    pageContentHeaderEl.textContent = quizQuestions[i].question;

    // as long as there are more answers to display, create more buttons
    for (var p = 0; p < quizQuestions[i].answers.length; p++) {
        //create answer button
        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "answer-btn";

        //set text of button to available answers
        answerBtnEl.textContent = quizQuestions[i].answers[p];
        console.log("Displyaing answer: " + quizQuestions[i].answers[p] + " at answer loop iteration: " + p);

        //add buttons to page
        pageContentBodyEl.appendChild(answerBtnEl);
    }
}

var checkAnswer = function (event) {
    //Since the buttons are dynamically generated, need to use event delegation to make sure the user is clicking an answer button
    if (event.target.className == "answer-btn") {
        console.log("checkAnswer: User clicked: " + event.target.textContent);

        //check if the clicked answer is correct or wrong
        if (event.target.textContent == quizQuestions[i].correctAnswer) {
            footerEl.textContent = "Correct!";
            console.log("Correct answer selected");
        }
        else {
            footerEl.textContent = "Wrong!";
            console.log("Wrong answer selected");
        }

        //advance the iterator
        i++;

        // as long as there are more questions in quizQuestions, display the next question
        if (i < quizQuestions.length) {
            console.log("Found more questions to ask. Iterator at: " + i);
            displayQuestionAndAnswers();
        }
        else {
            console.log("No more questions to ask")
            endQuiz();
        }
    }
}

var endQuiz = function () {
    console.log("endQuiz: End of quiz reached");

    pageContentHeaderEl.textContent = "All done! Your final score is: ";
    pageContentBodyEl.textContent = "Enter initials: ";
    
    var initialsTextBox = document.createElement("input");
    var submitScore = document.createElement("button");
    submitScore.className = "submit-high-score-btn";
    submitScore.textContent = "Submit";

    pageContentBodyEl.appendChild(initialsTextBox);
    pageContentBodyEl.appendChild(submitScore);

}

var submitHighScore = function (event) {
    if (event.target.className == "submit-high-score-btn") {
        console.log("submitHighScore: Submit high score button clicked");

        pageContentHeaderEl.textContent = "High scores";
        pageContentBodyEl.textContent = "";
        footerEl.textContent = "";

        var goBackButton = document.createElement("button");
        goBackButton.textContent = "Go Back";
        var clearHighScores = document.createElement("button");
        clearHighScores.textContent = "Clear High Scores";

        pageContentBodyEl.appendChild(goBackButton);
        pageContentBodyEl.appendChild(clearHighScores);
    }
}

/* END FUNCTION DECLARATIONS */

/* BEGIN EVENT LISTENERS */

startQuizEl.addEventListener("click", displayQuestionAndAnswers);
pageContentEl.addEventListener("click", checkAnswer);
pageContentEl.addEventListener("click", submitHighScore);

/*END EVENT LISTENERS */


displayWelcome();

