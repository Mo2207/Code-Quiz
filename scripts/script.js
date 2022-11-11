
// ----- Quiz Questions/Answers -----

const quizQuestions = [
  {
    question: "what is 1+1?",
    correctAnswer: 2,
    possibleAnswers: [1,3,4,2]
  },
  {
    question: "what is 2+2?",
    correctAnswer: 4,
    possibleAnswers: [1,3,5,4]
  },
  {
    question: "what is 3+3?",
    correctAnswer: 6,
    possibleAnswers: [2,3,4,6]
  },
  {
    question: "what is 4+4?",
    correctAnswer: 8,
    possibleAnswers: [2,3,4,8]
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

// ----- Question -----
let question = document.querySelector("#question");

// ----- Answers ------
let answersSect = document.querySelector("#answers");
let answersSectBtn = document.querySelector("#answers button");
let answer1 = document.querySelector("#answer1");
let answer2 = document.querySelector("#answer2");
let answer3 = document.querySelector("#answer3");
let answer4 = document.querySelector("#answer4");

// currentQuestion is purely used for the tracking of indices
let currentQuestion = 0;
let setQuestionAnswer = () => {
  console.log(`question and answers set, currentQuestion is: ${currentQuestion}`)
  if (currentQuestion == quizQuestions.length) {
    gameOver();
  }

  // sets the question's text content
  question.textContent = quizQuestions[currentQuestion].question;
  // sets all the answers values
  answer1.textContent = quizQuestions[currentQuestion].possibleAnswers[0];
  answer2.textContent = quizQuestions[currentQuestion].possibleAnswers[1];
  answer3.textContent = quizQuestions[currentQuestion].possibleAnswers[2];
  answer4.textContent = quizQuestions[currentQuestion].possibleAnswers[3];
}

let startQuiz = () => {
  // initializes the users current score at beginning of quiz
  let userScore = localStorage.setItem("userScore", 0)
  console.log(userScore)

  setQuestionAnswer();
  startTimer();

  // modifies the elements on the page
  scores.style.display = "none";
  end.style.display = "none";
  start.style.display = "none";
  question.style.display = "flex";
  answersSect.style.display = "flex";
}

let gameOver = () => {
  console.log("game over");
  yourScore.appendChild(userScore);
  // modifies the elements on the page
  scores.style.display = "flex"
  end.style.display = "flex";
  start.style.display = "flex";
  question.style.display = "none";
  answersSect.style.display = "none";

  // resets currentQuestion now that the game is over
  currentQuestion = 0;
}

let count;
let startTimer = () => {
  console.log("timer started!");

  count = 10;
  let countdown = setInterval(() => {
    count--;
    timerDisplay.textContent = count;

    if (count <= 0) {
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
      gameOver();
    } else {
      setQuestionAnswer();
    }
  } else {
    console.log("Wrong!");
    count -= 5;
    currentQuestion++;
    if (currentQuestion == quizQuestions.length) {
      gameOver();
    } else {
      setQuestionAnswer();
    }
  }
  // increments currentQuestion and calls function again to render next question in line
}

// ----- Event Listeners -----

start.addEventListener("click", startQuiz);
answer1.addEventListener("click", pickAnswer);
answer2.addEventListener("click", pickAnswer);
answer3.addEventListener("click", pickAnswer);
answer4.addEventListener("click", pickAnswer);


