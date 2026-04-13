const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const questionText = document.getElementById("question-text");
const resultScreen = document.getElementById("result-screen");
const currentQuestionCount = document.getElementById("current-question");
const totalQuestionCount = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const answersScreen = document.getElementById("answers-container");
const fullProgress = document.getElementById("progress-bar");
const progressBar = document.getElementById("progress");
const restartButton = document.getElementById("restart-btn");
const startButton = document.getElementById("start-btn");
const maxScoreSpan = document.getElementById("max-score");

const quizQuestions = [
  {
    question: "What is the capital city of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Paris", correct: true },
      { text: "Nairobi", correct: false },
      { text: "Kisumu", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "Who developed the theory of relativity?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Nikola Tesla", correct: false },
      { text: "Galileo Galilei", correct: false },
    ],
  },
  {
    question: "Which language is primarily used for React development?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
    ],
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Marketing Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Tool Multi Language", correct: false },
    ],
  },
];

//QUIZ STATE VARIABLES

let currentQuestionIdx = 0;
let score = 0;
let answersDisabled = false;

totalQuestionCount.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  console.log("quiz started!");
  currentQuestionIdx = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestions();
}

function showQuestions() {
  console.log("started");
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIdx];
  currentQuestionCount.textContent = currentQuestionIdx + 1;
  questionText.textContent = currentQuestion.question;
  const progressPercent =
    (currentQuestionIdx / quizQuestions.length) * 100 + "%";

  progressBar.style.width = progressPercent;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersScreen.appendChild(button);
  });
}
function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;
  const selectedAnswer = event.target;
  const isCorrect = selectedAnswer.dataset.correct === "true";

  Array.from(answersScreen.children).forEach((button) => {
    answersScreen.innerHTML = "";
    if (selectedAnswer.dataset.correct === "true") {
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIdx++;

    if (currentQuestionIdx < quizQuestions.length) {
      showQuestions();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;
  const percentage = score / quizQuestions.length;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! you are a genius";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Good job!, you know stuff";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good! keep learning";
  } else if (percentage >= 40) {
    resultMessage.textContent = "not bad! try again an improve";
  } else {
    resultMessage.textContent = "Keep studying, you'll get better";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
