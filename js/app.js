const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

// const dropdownToggle = document.querySelector(".nav__item .dropdown-toggle");
// const dropdownMenu = document.querySelector(".nav__item .dropdown-menu");

// dropdownToggle.addEventListener("click", () => {
//   dropdownToggle.classList.toggle("active");
//   dropdownMenu.classList.toggle("active");
// });
