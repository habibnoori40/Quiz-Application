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
document.querySelector(".submit_btn").addEventListener(
  "click",
  function () {
    document.querySelector(".note").classList.remove("show");
  },
  { once: true }
);

window.onload = function () {
  setTimeout(function () {
    document.querySelector(".note").classList.add("show");
  });
};
