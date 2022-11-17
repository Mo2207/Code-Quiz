
// ----- Quiz Questions/Answers -----

const quizQuestions = [
  {
    question: "Arrays in Javascript store items in what syntax?",
    correctAnswer: "[]",
    possibleAnswers: [`""`,"()","{}","[]"]
  },
  {
    question: `Which of the following would make this statement true: 1 _ 2`,
    correctAnswer: "<",
    possibleAnswers: ["==","<",">","="]
  },
  {
    question: "The syntax to declare a variable in Javascript is:",
    correctAnswer: "var =",
    possibleAnswers: ["var ==","variable =","var =","var ==="]
  },
  {
    question: `What would "console.log(myVar)" return if: var myVar;`,
    correctAnswer: "undefined",
    possibleAnswers: ["nothing","unknown","undefined","null"]
  },
  {
    question: `Which data-type has either true/false values?`,
    correctAnswer: "booleans",
    possibleAnswers: ["booleans","strings","Numbers","Objects"]
  }
]

// ----- Highscores & Timer-----
let highScores = document.querySelector("#highscores");
let timerDisplay = document.querySelector("#timer");

// ----- Start Quiz and Game over-----
let start = document.querySelector("#startQuiz");
let end = document.querySelector("#gameOver");
let yourScore = document.querySelector("#yourScore");
let scores = document.querySelector("#scorePage");
let scoreTable = document.querySelector("#scoreTable")

// ----- Question -----
let question = document.querySelector("#question");

// ----- Answers ------
let answersSect = document.querySelector("#answers");
let answersSectBtn = document.querySelector("#answers button");
let answer1 = document.querySelector("#answer1");
let answer2 = document.querySelector("#answer2");
let answer3 = document.querySelector("#answer3");
let answer4 = document.querySelector("#answer4");
let answer5 = document.querySelector("#answer5");

// currentQuestion is purely used for the tracking of indices
let currentQuestion = 0;
let setQuestionAnswer = () => {
  console.log(`question and answers set, currentQuestion is: ${currentQuestion}`)
  if (currentQuestion == quizQuestions.length) {
    count = 1;
  }

  // sets the question's text content
  question.textContent = quizQuestions[currentQuestion].question;
  // sets all the answers values

  answer1.textContent = quizQuestions[currentQuestion].possibleAnswers[0];
  answer2.textContent = quizQuestions[currentQuestion].possibleAnswers[1];
  answer3.textContent = quizQuestions[currentQuestion].possibleAnswers[2];
  answer4.textContent = quizQuestions[currentQuestion].possibleAnswers[3];
}

// initializes userScore, starting at 0
localStorage.setItem("userScore", 0);
let userScore = localStorage.userScore;

let startQuiz = () => {
  setQuestionAnswer();
  startTimer();

  // makes sure userScore is at 0 to start
  localStorage.userScore = 0;

  // modifies the elements on the page
  scores.style.display = "none";
  end.style.display = "none";
  start.style.display = "none";
  question.style.display = "flex";
  answersSect.style.display = "flex";
}

let count;
let startTimer = () => {
  console.log("timer started!");

  count = 30;
  let countdown = setInterval(() => {
    count--;
    timerDisplay.textContent = count;

    if (count <= 0) {
      // once count is 0 or less, ends the game and updates html elements. Also updates timerDisplay to 0 so a negative number is not displayed at the game over screen
      timerDisplay.textContent = 0;
      clearInterval(countdown);
      start.style.display = "flex";
      start.textContent = "Restart Quiz";
      question.style.display = "none";
      answersSect.style.display = "none";
      gameOver();
    }
  }, 1000);
}

let pickAnswer = (e) => {
  if (e.target.textContent == quizQuestions[currentQuestion].correctAnswer) {
    console.log("Correct!");
    localStorage.userScore++;

    currentQuestion++;
    if (currentQuestion == quizQuestions.length) {
      count = 1;
    } else {
      setQuestionAnswer();
    }
  } else {
    console.log("Wrong!");
    // subtracts 5 seconds from timer if user picks wrong answer
    count -= 5;
    currentQuestion++;
    if (currentQuestion == quizQuestions.length) {
      count = 1;
    } else {
      setQuestionAnswer();
    }
  }
}

let gameOver = () => {
  console.log("game over");
  // displays userScore to scorePage
  yourScore.innerHTML = `Your score: ${localStorage.userScore}`;

  // modifies the elements on the page
  scores.style.display = "flex"
  end.style.display = "flex";
  start.style.display = "flex";
  start.textContent = "Restart Quiz";
  question.style.display = "none";
  answersSect.style.display = "none";

  // resets currentQuestion now that the game is over
  currentQuestion = 0;
  // end the counter
  count = 1;
}
let form = document.querySelector("#form");
console.log(form)

let initalScore = (e) => {
  e.preventDefault();

  if (initials.value == "") {
    alert("Input required for initials!");
    return null;
  } else {
    // adds initials and score to localStorage when submitted
    localStorage.setItem(initials.value, localStorage.userScore)

    // adds initials and score to table
    let row = scoreTable.insertRow(-1);
    let val1 = row.insertCell(0);
    let val2 = row.insertCell(1);
    val1.innerHTML = initials.value.toUpperCase();
    val2.innerHTML = localStorage.userScore;
    initials.value = "";
  }

  
}

// ----- Event Listeners -----

start.addEventListener("click", startQuiz);
answer1.addEventListener("click", pickAnswer);
answer2.addEventListener("click", pickAnswer);
answer3.addEventListener("click", pickAnswer);
answer4.addEventListener("click", pickAnswer);
highScores.addEventListener("click", gameOver);
form.addEventListener("submit", initalScore);

