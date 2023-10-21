const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Elephant",
        correct: false,
      },
      {
        text: "Blue Whale",
        correct: true,
      },
      {
        text: "Giraffe",
        correct: false,
      },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      {
        text: "Asia",
        correct: false,
      },
      {
        text: "Australia",
        correct: true,
      },
      {
        text: "Arctic",
        correct: false,
      },
      {
        text: "Africa",
        correct: false,
      },
    ],
  },
  {
    question: "Which is the longest river in the world?",
    answers: [
      {
        text: "Great Ganga",
        correct: false,
      },
      {
        text: "Nile",
        correct: true,
      },
      {
        text: "Amazon",
        correct: false,
      },
      {
        text: "Niger",
        correct: false,
      },
    ],
  },
  {
    question: "Which is the largest ocean in the world?",
    answers: [
      {
        text: "Pacific Ocean",
        correct: true,
      },
      {
        text: "Indian Ocean",
        correct: false,
      },
      {
        text: "Arctic Ocean",
        correct: false,
      },
      {
        text: "Atlantic Ocean",
        correct: false,
      },
    ],
  },
  {
    question: "Which is India’s first super computer?",
    answers: [
      {
        text: "param80000",
        correct: false,
      },
      {
        text: "param800",
        correct: false,
      },
      {
        text: "param8",
        correct: false,
      },
      {
        text: "param8000",
        correct: true,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", (e) => {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
      } else {
        selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
    });
  });
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
