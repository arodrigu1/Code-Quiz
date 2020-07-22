
var questions = [
  {
      question: "How do you make a function in JavaScript?",
      choices: ["function myFunction()", "function: myFunction()", "function = myFunction()"],
      answer: "function myFunction()"
  },
  {
      question: "How do you add a comment in JavaScript?",
      choices: ["//This is a comment", "--This is a comment", "**This is a comment"],
      answer: "//This is a comment"
  },
  {
      question: "Arrays in Javascript can be used to store ____.",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
  },
  {
      question: "What is the JavaScript Element uthat represents either TRUE or FALSE values?",
      choices: ["string", "boolean", "condition"],
      answer: "quotes"
  },


];
// Declared variables
var score = 0;
var questionIndex = 0;

//Elements
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");


var secondsLeft = 75;
var holdInterval = 0;
var wrongAnswer = 10;
// Creates new element
var ulCreate = document.createElement("ul");


timer.addEventListener("click", function () {
 
  if (holdInterval === 0) {
      holdInterval = setInterval(function () {
          secondsLeft--;
          currentTime.textContent = "Countdown: " + secondsLeft;

          if (secondsLeft <= 0) {
              clearInterval(holdInterval);
              finished();
              currentTime.textContent = "You've ran out of time.";
          }
      }, 1000);
  }
  render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";
  for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questionIndex].question;
      var userChoices = questions[questionIndex].choices;
      questionsDiv.textContent = userQuestion;
  }
  // New for each for question choices
  userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsDiv.appendChild(ulCreate);
      ulCreate.appendChild(listItem);
      listItem.addEventListener("click", (compare));
  })
}
// Event to compare choices with answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      // Correct condition 
      if (element.textContent == questions[questionIndex].answer) {
          score++;
          createDiv.innerHTML =("<img width= 50px src=/images/correct.png>")
         
      } else {
          // Will deduct -5 seconds off secondsLeft for wrong answers
          secondsLeft = secondsLeft - wrongAnswer;
          createDiv.innerHTML =("<img width= 50px src=/images/wrong.png>");
      }

  }
  // Question Index determines number question user is on
  questionIndex++;

  if (questionIndex >= questions.length) {
      // All done will append last page with user stats
      finished();
      createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
  } else {
      render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);

}
// All done will append last page
function finished() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  // Heading:
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!"

  questionsDiv.appendChild(createH1);

  // Paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  // Calculates time remaining and replaces it with score
  if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      var createP2 = document.createElement("p");
      clearInterval(holdInterval);
      createP.textContent = "Your final score is: " + timeRemaining;

      questionsDiv.appendChild(createP2);
  }

  // Label
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);

  // input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);

  // submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "End Quiz";

  questionsDiv.appendChild(createSubmit);

  // Event listener to capture initials and local storage for initials and score
  createSubmit.addEventListener("click", function () {
      var initials = createInput.value;

      if (initials === null) {

          console.log("No value entered!");

      } else {
          var finalScore = {
              initials: initials,
              score: timeRemaining
          }
          console.log(finalScore);
          var allScores = localStorage.getItem("allScores");
          if (allScores === null) {
              allScores = [];
          } else {
              allScores = JSON.parse(allScores);
          }
          allScores.push(finalScore);
          var newScore = JSON.stringify(allScores);
          localStorage.setItem("allScores", newScore);
          // Travels to final page
          window.location.replace("./HighScores.html");
      }
  });

}
