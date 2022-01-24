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
var welcomePageDiv = document.querySelector(".welcome-page");
var questionsPageDiv = document.querySelector(".questions-page");
var endQuizDiv = document.querySelector(".end-quiz-page");
var highScoresDiv = document.querySelector(".view-high-scores-page");
var footerDiv = document.querySelector(".footer");
var pageContentHeaderEl = document.querySelector(".page-content-header");
var correctOrWrongEl = document.querySelector(".correct-or-wrong");

// buttons
var headerHighScoreBtn = document.querySelector(".view-high-scores-btn");
var submitHighScoreBtn = document.querySelector(".submit-high-score-btn");
var goBackBtn = document.querySelector(".go-back-btn");
var startQuizBtn = document.querySelector(".start-quiz-btn");
var clearHighScoresBtn = document.querySelector(".clear-high-scores-btn");

// other variables
var questionsAsked = 0;
var quizTimeInSec = 75;
var timerEl = document.querySelector(".timer");
var timerTimeout;
var playerInitials;

/* END VARIBLE DECLARATIONS */


/* BEGIN FUNCTION DECLARATIONS */

var displayWelcome = function () {
    console.log("displayWelcome: Displaying welcome screen");

    //reset questions asked to 0, since we're starting a new quiz
    questionsAsked = 0;

    //reset the timer, since we're starting a new quiz
    quizTimeInSec = 75;

    //hide all the child divs of page-content and just display the welcome div
    hideAllContentChildDivs();
    welcomePageDiv.style.display = "block";
    welcomePageDiv.querySelector("h1").textContent = "Coding Challenge Quiz";
    welcomePageDiv.querySelector("p").textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startQuizBtn.textContent = "Start Quiz";
}

var displayQuestionAndAnswers = function () {
    console.log("displayQuestionAndAnswers: Displaying question at iteration: " + questionsAsked);

    //hide all the child divs of page-content and just disply the questions and footer div
    hideAllContentChildDivs();
    questionsPageDiv.style.display = "block";
    footerDiv.style.display = "block";
    //clear all the child elements in questionsPageDiv since we will dynamically create everything
    questionsPageDiv.innerHTML = '';

    //setup the timer
    decrementTimer(); //call the timer once in order to get it to display as soon as we start the quiz
    timerTimeout = setInterval(decrementTimer, 1000);

    //set the h1 to the text of the question
    var questionEl = document.createElement("h1");
    questionEl.textContent = quizQuestions[questionsAsked].question;
    questionsPageDiv.appendChild(questionEl);

    //create a container for the answer buttons
    var answerButtonContainer = document.createElement("div")
    answerButtonContainer.setAttribute("class", "answer-btn-container");
    questionsPageDiv.appendChild(answerButtonContainer);

    // as long as there are more answers to display, create more buttons
    for (var p = 0; p < quizQuestions[questionsAsked].answers.length; p++) {
        //create answer button
        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "answer-btn";

        //set text of button to available answers
        answerBtnEl.textContent = quizQuestions[questionsAsked].answers[p];
        console.log("Displyaing answer: " + quizQuestions[questionsAsked].answers[p] + " at answer loop iteration: " + p);

        //add buttons to page
        questionsPageDiv.querySelector(".answer-btn-container").appendChild(answerBtnEl);
    }
}

var checkAnswer = function (event) {
    //Since the buttons are dynamically generated, need to use event delegation to make sure the user is clicking an answer button
    if (event.target.className == "answer-btn") {
        console.log("checkAnswer: User clicked: " + event.target.textContent);

        //turn on the border line for the footer:
        correctOrWrongEl.setAttribute("style", "border-top: solid");

        //check if the clicked answer is correct or wrong
        if (event.target.textContent == quizQuestions[questionsAsked].correctAnswer) {
            correctOrWrongEl.textContent = "Correct!";
            console.log("Correct answer selected");
        }
        else {
            correctOrWrongEl.textContent = "Wrong!";
            quizTimeInSec = quizTimeInSec - 5;
            console.log("Wrong answer selected. Subtracting 5 seconds from time remaining.");
        }

        //advance the iterator
        questionsAsked++;

        //stop the timer since we will restart it when we ask the next quesiton
        clearTimeout(timerTimeout);

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

    //hide all the child divs of page-content and just disply the end quiz and the footer div
    hideAllContentChildDivs();
    endQuizDiv.style.display = "block";
    footerDiv.style.display = "block";

    //reset input to blank
    endQuizDiv.querySelector(".initials").value = "";

    //display the final score
    endQuizDiv.querySelector(".final-score-text").textContent = "Your final score is: " + quizTimeInSec;
}

var saveHighScore = function () {
    playerInitials = endQuizDiv.querySelector(".initials").value;
    console.log("saveHighScore: Saving high score: " + playerInitials + " " + quizTimeInSec);

    localStorage.setItem("highScore" + Date.now(), playerInitials + " - " + quizTimeInSec)
    showHighScores();
}

var clearHighScores = function () {
    console.log("clearHighScores: deleting local storage")

    var itemsToDelete = [];
    //loop through all items in local storage and add the ones we want to delete to the itemsToDelete array
    //itemsToDelete array is needed because if we try to delete directly from LocalStorage, the index changes and we end up 
    //only partially deleting the keys we want
    for (i = 0; i < window.localStorage.length; i++) {
        key = localStorage.key(i);
        if (key.slice(0,9) === "highScore") {
            itemsToDelete.push(localStorage.key(i));
        }
    }

    //loop through the itemsToDelete array to delete the ones we want from local storage
    for (i = 0; i < itemsToDelete.length; i++) {
        localStorage.removeItem(itemsToDelete[i]);
    }

    //reload the page when done
    showHighScores();
}

var showHighScores = function () {
    console.log("showHighScore: Displaying high scores");

    //hide all the child divs of page-content and just disply the high score div
    hideAllContentChildDivs();
    highScoresDiv.style.display = "block";

    //hide the timer
    timerEl.textContent = "";

    //remove all high score elements since we will dynamically recreate them 
    highScoresDiv.querySelector(".high-scores-container").innerHTML = "";


    //get high scores from localStorage and display on page
    var highScoreContainer = document.querySelector(".high-scores-container");

    //get all items from local storage, but only keep the ones that we want in storageContents
    var storageContents = [];
    for (i = 0; i < window.localStorage.length; i++) {
        key = window.localStorage.key(i);
        if (key.slice(0,9) === "highScore") {
            storageContents.push(localStorage.getItem(key));
        }
    }

    // show the high scores
    for (var p = 0; p < storageContents.length; p++) {
        //create answer button
        var highScore = document.createElement("p");
        highScore.setAttribute("class", "high-score");

        //set text of highScore to high score value
        highScore.textContent = storageContents[p];
        console.log("Displyaing high score: " + storageContents[p]);

        //add buttons to page
        highScoreContainer.appendChild(highScore);
    }
}

var decrementTimer = function () {
    if (quizTimeInSec == 0) {
        //stop the timer
        clearTimeout(timerTimeout);
        console.log("decrementTimer: Time is up, ending quiz.")
        endQuiz();
    }
    timerEl.textContent = "Time left: " + quizTimeInSec;
    quizTimeInSec--;
}

var hideAllContentChildDivs = function () {
    var childElements = document.querySelector(".page-content").children
    for (i = 0; i < childElements.length; i++) {
        if (childElements[i].localName = "div") {
            childElements[i].style.display = "none";
        }
    }
}

/* END FUNCTION DECLARATIONS */

/* BEGIN EVENT LISTENERS */

startQuizBtn.addEventListener("click", displayQuestionAndAnswers);
questionsPageDiv.addEventListener("click", checkAnswer);
headerHighScoreBtn.addEventListener("click", showHighScores);
submitHighScoreBtn.addEventListener("click", saveHighScore);
goBackBtn.addEventListener("click", displayWelcome);
clearHighScoresBtn.addEventListener("click", clearHighScores);


/*END EVENT LISTENERS */


displayWelcome();

