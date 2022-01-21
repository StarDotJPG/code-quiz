var question1 = "Commonly used data types do NOT include:";
var question1Choices = ["strings", "booleans", "alerts", "numbers"];
var question1Answer = "alerts";

var question2 = "The condition in an if / else statement is enclosed with:";
var question2Choices = ["quotes", "curly braces", "parenthesis", "square brackets"];
var question2Answer = "parenthesis";

var question3 = "Arrays in JavaScript can be used to store:";
var question3Choices = ["numbers and strings", "other arrays", "booleans", "all of the above"];
var question3Answer = "all of the above";

var question4 = "String values must be enclosed within _____ when being assigned to variables";
var question4Choices = ["commas", "curly braces", "quotes", "parenthesis"]
var question4Answer = "quotes";

var question5 = "A very useful tool during development and debugging for printing content to the debugger is:"
var question5Choices = ["JavaScript", "terminal/bash", "for loops", "console.log"];
var question5Answer = "console.log";

var endQuizMessage = "All done! Your final score is: Enter initials: ";

var highScoreMessage = "Go back or clear high scores buttons";

// View high scores, uppoer left hand corner
// Timer, upper right corner
// "Wrong!" or "Correct!" displayed after question is answered
// when "start quiz" button is clicked, display first question

var pageContentEl       = document.querySelector(".page-content");
var pageContentHeaderEl = document.querySelector(".page-content-header");
var pageContentBodyEl   = document.querySelector(".page-content-body");
var startQuizEl         = document.querySelector(".start-quiz-btn");
var footerEl            = document.querySelector(".footer");

var displayQuestionAndAnswers = function () {
    //clear any existing text
    pageContentBodyEl.textContent = "";

    //remove start quiz button
    startQuizEl.remove();

    //set the h1 to the text of the question
    pageContentHeaderEl.textContent = question1;

    //create answer buttons
    var answer1BtnEl = document.createElement("button");
    var answer2BtnEl = document.createElement("button");
    var answer3BtnEl = document.createElement("button");
    var answer4BtnEl = document.createElement("button");

    //set text of buttons to available answers
    answer1BtnEl.textContent = question1Choices[0];
    answer2BtnEl.textContent = question1Choices[1];
    answer3BtnEl.textContent = question1Choices[2];
    answer4BtnEl.textContent = question1Choices[3];

    //add buttons to page
    pageContentBodyEl.appendChild(answer1BtnEl);
    pageContentBodyEl.appendChild(answer2BtnEl);
    pageContentBodyEl.appendChild(answer3BtnEl);
    pageContentBodyEl.appendChild(answer4BtnEl);

    //capture which answer the user clicks
    pageContentBodyEl.addEventListener("click", function (event) {
        //check if the clicked answer is correct or wrong
        if (event.target.textContent == question1Answer) {
            footerEl.textContent = "Correct!";
        }
        else {
            footerEl.textContent = "Wrong!";
        }
    })
}




startQuizEl.addEventListener("click", displayQuestionAndAnswers);

