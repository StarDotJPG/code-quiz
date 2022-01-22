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
// divs
var welcomePageDiv      = document.querySelector(".welcome-page");
var questionsPageDiv    = document.querySelector(".questions-page");
var endQuizDiv          = document.querySelector(".end-quiz-page");
var highScoresDiv       = document.querySelector(".view-high-scores-page");
var pageContentHeaderEl = document.querySelector(".page-content-header");
var footerEl            = document.querySelector(".footer");

// buttons
var headerHighScoreBtn  = document.querySelector(".view-high-scores-btn");
var submitHighScoreBtn  = document.querySelector(".submit-high-score-btn");
var goBackBtn           = document.querySelector(".go-back-btn");
var startQuizBtn        = document.querySelector(".start-quiz-btn");
var clearHighScoresBtn  = document.querySelector(".clear-high-scores-btn");

// other variables
var questionsAsked      = 0;

/* END VARIBLE DECLARATIONS */


/* BEGIN FUNCTION DECLARATIONS */

var displayWelcome = function () {
    console.log("displayWelcome: Displaying welcome screen");

    //reset questions asked to 0, since we're starting a new quiz
    questionsAsked = 0;

    //hide all the child divs of page-content and just display the welcome div
    hideAllContentChildDivs();
    welcomePageDiv.setAttribute("style", "visiblity: ")
    welcomePageDiv.querySelector("h1").textContent = "Coding Challenge Quiz";
    welcomePageDiv.querySelector("p").textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startQuizBtn.textContent = "Start Quiz";
}

var displayQuestionAndAnswers = function () {
    console.log("displayQuestionAndAnswers: Displaying question at iteration: " + questionsAsked);

    //hide all the child divs of page-content and just disply the questions div
    hideAllContentChildDivs();
    questionsPageDiv.setAttribute("style", "visiblity: ");
    //clear all the child elements in questionsPageDiv since we will dynamically create everything
    questionsPageDiv.innerHTML = '';

    //set the h1 to the text of the question
    var questionEl = document.createElement("h1");
    questionEl.textContent = quizQuestions[questionsAsked].question;
    questionsPageDiv.appendChild(questionEl);

    // as long as there are more answers to display, create more buttons
    for (var p = 0; p < quizQuestions[i].answers.length; p++) {
        //create answer button
        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "answer-btn";

        //set text of button to available answers
        answerBtnEl.textContent = quizQuestions[questionsAsked].answers[p];
        console.log("Displyaing answer: " + quizQuestions[questionsAsked].answers[p] + " at answer loop iteration: " + p);

        //add buttons to page
        questionsPageDiv.appendChild(answerBtnEl);
    }
}

var checkAnswer = function (event) {
    //Since the buttons are dynamically generated, need to use event delegation to make sure the user is clicking an answer button
    if (event.target.className == "answer-btn") {
        console.log("checkAnswer: User clicked: " + event.target.textContent);

        //check if the clicked answer is correct or wrong
        if (event.target.textContent == quizQuestions[questionsAsked].correctAnswer) {
            footerEl.textContent = "Correct!";
            console.log("Correct answer selected");
        }
        else {
            footerEl.textContent = "Wrong!";
            console.log("Wrong answer selected");
        }

        //advance the iterator
        questionsAsked++;

        // as long as there are more questions in quizQuestions, display the next question
        if (questionsAsked < quizQuestions.length) {
            console.log("Found more questions to ask. Iterator at: " + questionsAsked);
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

    //hide all the child divs of page-content and just disply the end quiz div
    hideAllContentChildDivs();
    endQuizDiv.setAttribute("style", "visiblity: ");

    endQuizDiv.querySelector("h1").textContent = "All done! Your final score is: ";
    endQuizDiv.querySelector("p").textContent = "Enter initials: ";

}

var submitHighScore = function () {
    console.log("submitHighScore: Asking user for initials for high score");

    footerEl.textContent = "";
    submitHighScoreBtn.textContent = "Submit";
}

var showHighScores = function () {
    console.log("showHighScore: Displaying high scores");

    //hide all the child divs of page-content and just disply the high score div
    hideAllContentChildDivs();
    highScoresDiv.setAttribute("style", "visiblity: ");

    highScoresDiv.querySelector("h1").textContent = "High Scores";
    goBackBtn.textContent = "Go Back";
    clearHighScoresBtn = "Clear High Scores";
}

var hideAllContentChildDivs = function () {
    var childElements = document.querySelector(".page-content").children
    for (i = 0; i < childElements.length; i++) {
        if (childElements[i].localName = "div") {
            childElements[i].setAttribute("style", "display:none");
        }
    }
}


/* END FUNCTION DECLARATIONS */

/* BEGIN EVENT LISTENERS */

startQuizBtn.addEventListener("click", displayQuestionAndAnswers);
questionsPageDiv.addEventListener("click", checkAnswer);
headerHighScoreBtn.addEventListener("click", showHighScores);
submitHighScoreBtn.addEventListener("click", showHighScores);
goBackBtn.addEventListener("click", displayWelcome);


/*END EVENT LISTENERS */


displayWelcome();

