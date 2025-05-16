const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "New Delhi", correct: true },
      { text: "Mumbai", correct: false },
      { text: "Chennai", correct: false },
      { text: "Kolkata", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false }
    ]
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Leo Tolstoy", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const timeDisplay = document.getElementById("time");

if (questionEl && answerButtons) {
  startQuiz();
}

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";
  if (correct) {
    score++;
  }
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "#28a745";
    } else {
      button.style.backgroundColor = "#dc3545";
    }
  });
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  clearInterval(timer);
  localStorage.setItem("quizScore", score);
  localStorage.setItem("quizTotal", questions.length);
  window.location.href = "result.html";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}
