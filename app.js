// Select HTML Elements
const quizApp = document.querySelector(".quiz-app");
const questionsNumber = document.querySelectorAll(".question-count span");
const quizTitleContainer = document.querySelector(".quiz-title");
const questionsContainer = document.querySelector(".questions");
const title = document.querySelector(".quiz-title h2");
const inputs = document.querySelectorAll(".questions input");
const answer = document.querySelectorAll(".questions label");
const submit = document.querySelector(".submit_btn");
const countDwonEl = document.querySelector(".count_down");
const resultContainer = document.getElementById("result");
const resultText = document.querySelector("#result span");
const progressBar = document.querySelector(".progress_bar span");
//
let questionsLength;
let questionCount = 0;
let correctAnsIndx = 0;
//
let timeInterval;
let minutes;
let seconds;

function quizStarter(path) {
  submit.addEventListener(
    "click",
    function () {
      quizApp.classList.remove("hide");

      removeClass();

      submit.textContent = "NEXT";

      getQuestions(path);

      setTimeout(function () {
        if (window.innerWidth <= 400) {
          document.body.style.justifyContent = "unset";
        }
      }, 200);
    },
    { once: true }
  );
}

quizStarter("./questions/markup_mcq.json");

function removeClass() {
  setTimeout(() => {
    quizTitleContainer.classList.remove("delete", "visibility");
    questionsContainer.classList.remove("delete", "visibility");
  }, 250);
}

// Fetch Questions
async function getQuestions(url) {
  try {
    let questions = await (await fetch(url)).json();

    let random_Q = randomize(questions);

    questionsLength = random_Q.length = 5;

    // For Setting Questions Length And Current Questions Number
    setQuestionNumber(questionsLength, questionCount);

    // For Adding The Questions From The Data Object
    addQuestions(random_Q[questionCount], questionsLength);

    clearInterval(timeInterval);
    timer(100, questionsLength);

    submit.onclick = () => {
      if (questionCount >= questionsLength) return;

      // Get Correct Answer
      let correctAnswer = random_Q[questionCount].correct;

      // Increase Index Of Question
      questionCount++;

      // Increase Width Of Progress Bar When Ever The Next Question Comes
      progressBar.style.width = (questionCount / questionsLength) * 100 + "%";

      // For Checking The Correct And Wrong Answer
      checkAnswer(correctAnswer);

      // For Showing The Final Result
      showResult(questionsLength);

      // Set Questions Length And Current Questions Number Again Because We Increased questioncount index
      setQuestionNumber(questionsLength, questionCount);

      // Add The Questions Again Because We Increased questioncount index [This Is to keep adding the next quistions]
      addQuestions(random_Q[questionCount], questionsLength);

      // Clearing The Interval and adding it agian for when ever we click the submit, the intreval resets
      clearInterval(timeInterval);
      timer(100, questionsLength);
    };
  } catch (error) {
    console.log(error);
  }
}

function setQuestionNumber(qlength, current) {
  if (current < qlength) current++;

  questionsNumber[1].textContent = qlength;
  questionsNumber[0].textContent = current;
}

function addQuestions(qObj, qlength) {
  if (questionCount < qlength) {
    title.textContent = qObj["title"];

    for (let i = 1; i <= answer.length; i++) {
      answer[i - 1].textContent = qObj[`answer_${i}`];
    }
  }
}

function checkAnswer(correctAns) {
  let userAnswer;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) userAnswer = answer[i].textContent;

    inputs[i].checked = false;
  }

  if (correctAns === userAnswer) correctAnsIndx++;
}

function showResult(qlength) {
  if (questionCount === qlength) {
    let resultInPercentage = ((correctAnsIndx / qlength) * 100).toFixed(2);

    resultContainer.classList.add("show");

    countDwonEl.innerHTML = "";

    submit.textContent = "Return Home";
    submit.onclick = () => (location.pathname = "/quiz-application/");

    removeElements();

    showMessage(qlength, resultInPercentage);
  }
}

function removeElements() {
  quizTitleContainer.style.opacity = "0";
  questionsContainer.style.opacity = "0";

  setTimeout(() => {
    quizTitleContainer.remove();
    questionsContainer.remove();
  }, 350);
}

function showMessage(qlength, percentage) {
  if (percentage > 49 && percentage < 70) {
    resultText.innerHTML = `Your level is somewhat reasonable, but you must learn and practice more. You have answered <strong>${correctAnsIndx} from ${qlength}</strong> questions.
Your result in percentage <strong>${percentage}%</strong>. Here are some tips for you: read articles and most importantly, learn and pratice more.`;
  } else if (percentage >= 70 && percentage <= 85) {
    resultText.innerHTML = `Your level is great, you answered almost all the questions. I think you are one of the hardworking people and you have the readiness to do any thing. You have answered <strong>${correctAnsIndx} from ${qlength}</strong> questions.
Your result in percentage <strong>${percentage}%</strong>`;
    createStars();
  } else if (percentage > 85 && percentage <= 100) {
    resultText.innerHTML = `Your level is outstanding, you answered all questions. I want to ask you, where did you learn all this from?
I believe that you are developing rapidly. You have answered <strong>${correctAnsIndx} from ${qlength}</strong> questions. Your result in percentage <strong>${percentage}%</strong>`;
    createStars();
  } else {
    resultText.innerHTML = `Your level is very bad and I think you are in danger unless you evolve. Here are some quick tips: try to search and read in articles, learn the basics, and understand the logic behind things. You have answered <strong>${correctAnsIndx} from ${qlength}</strong> questions.
Your result in percentage <strong>${percentage}%</strong>`;
  }
}
createStars();
// Create Stars Image GIF
function createStars() {
  let img = document.createElement("img");
  if(location.href == "https://habibnoori40.github.io/quiz-application/") {
    img.src = "./img/stars.gif";
  } else {
    img.src = "../img/stars.gif";
  }
  img.className = "stars";

  document.body.appendChild(img);

  // Remove Stars
//   setTimeout(function () {
//     img.remove();
//   }, 3700);
}

// For Randomizing The Questions
function randomize(arr) {
  let i = arr.length,
    j = 0,
    temp;

  while (--i) {
    j = Math.floor(Math.random() * i);
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}

function timer(time, qlength) {
  if (questionCount < qlength) {
    timeInterval = setInterval(() => {
      minutes = parseInt(time / 60);
      seconds = parseInt(time % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countDwonEl.textContent = `${minutes} : ${seconds}`;

      if (--time < 0) {
        clearInterval(timeInterval);
        submit.click();
      }
    }, 960);
  }
}

export { quizStarter };

// Others

// document.querySelector(".quiz-app").onselectstart = () => false;
// document.querySelector(".quiz-app").onmousedown = () => false;
// window.oncontextmenu = () => false;
// document.onkeydown = function (e) {
//   if (
//     e.key == "F12" ||
//     (e.ctrlKey && e.shiftKey && e.key == "I") ||
//     e.key == "i"
//   ) {
//     return false;
//   }
//   if ((e.ctrlKey && e.shiftKey && e.key == "J") || e.key == "j") {
//     return false;
//   }
//   if ((e.ctrlKey && e.key == "u") || e.key == "U") {
//     return false;
//   }
// };
