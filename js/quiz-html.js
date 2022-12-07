import { getQuestions } from "../app.js";

getQuestions("../questions/markup_mcq.json");

const links = document.querySelectorAll("nav ul a");

// For Links In Home Page
links.forEach((item) => {
  item.onclick = function () {
    links.forEach((item) => {
      item.classList.remove("active");
    });

    item.classList.add("active");
  };
});

// For The (Note) appearance
document.querySelector(".start_quiz").onclick = function () {
  document.querySelector(".note").classList.remove("show");
};

window.onload = function () {
  setTimeout(function () {
    document.querySelector(".note").classList.add("show");
  }, 600);
};
