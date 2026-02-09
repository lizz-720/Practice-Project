const flashcards = [
  {
    front: "What is Python?",
    back: "A versatile programming language used for web, data, and automation.",
  },
  {
    front: "What does CSS control?",
    back: "The look and layout of HTML elements on the page.",
  },
  {
    front: "What is a study sprint?",
    back: "A focused block of time dedicated to learning without distractions.",
  },
];

let flashcardIndex = 0;
const flashcard = document.getElementById("flashcard");
const flashcardFront = document.getElementById("flashcard-front");
const flashcardBack = document.getElementById("flashcard-back");
const flashcardNext = document.getElementById("flashcard-next");

const updateFlashcard = () => {
  const card = flashcards[flashcardIndex];
  flashcardFront.textContent = card.front;
  flashcardBack.textContent = card.back;
  flashcard.classList.remove("flipped");
};

flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

flashcardNext.addEventListener("click", () => {
  flashcardIndex = (flashcardIndex + 1) % flashcards.length;
  updateFlashcard();
});

updateFlashcard();

let timerInterval = null;
let remainingSeconds = 25 * 60;
const timerDisplay = document.getElementById("timer-display");

const renderTime = () => {
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
};

const startTimer = () => {
  if (timerInterval) {
    return;
  }
  timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds -= 1;
      renderTime();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }, 1000);
};

const pauseTimer = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};

const resetTimer = () => {
  pauseTimer();
  remainingSeconds = 25 * 60;
  renderTime();
};

renderTime();

document.getElementById("timer-start").addEventListener("click", startTimer);
document.getElementById("timer-pause").addEventListener("click", pauseTimer);
document.getElementById("timer-reset").addEventListener("click", resetTimer);

const blankInput = document.getElementById("blank-input");
const blankFeedback = document.getElementById("blank-feedback");

const checkBlank = () => {
  const answer = blankInput.value.trim().toLowerCase();
  if (!answer) {
    blankFeedback.textContent = "Type your answer to check.";
    blankFeedback.style.color = "#e05f5f";
    return;
  }
  if (answer === "hypertext") {
    blankFeedback.textContent = "Correct! HTML stands for HyperText Markup Language.";
    blankFeedback.style.color = "#2e7d32";
  } else {
    blankFeedback.textContent = "Not quite. Hint: it starts with Hyper.";
    blankFeedback.style.color = "#e05f5f";
  }
};

document.getElementById("blank-check").addEventListener("click", checkBlank);

const quizFeedback = document.getElementById("quiz-feedback");
const quizSubmit = document.getElementById("quiz-submit");

quizSubmit.addEventListener("click", () => {
  const selected = document.querySelector("input[name='quiz']:checked");
  if (!selected) {
    quizFeedback.textContent = "Pick an answer to continue.";
    quizFeedback.style.color = "#e05f5f";
    return;
  }
  if (selected.value === "python") {
    quizFeedback.textContent = "Correct! The backend is powered by Python.";
    quizFeedback.style.color = "#2e7d32";
  } else {
    quizFeedback.textContent = "Not yet. This demo uses Python.";
    quizFeedback.style.color = "#e05f5f";
  }
});
