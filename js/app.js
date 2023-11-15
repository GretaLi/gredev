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

// Initialize VanillaTilt for 3D Tilt Effect
function initVanillaTilt(selector, options) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    VanillaTilt.init(element, options);
  });
}

// Spread Skill Items on Large Screens
function spreadSkillItems() {
  const skillItems = document.querySelectorAll(".skill__item");

  function toggleActiveClass(e) {
    skillItems.forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.toggle("active");
  }

  function handleWindowClick(e) {
    if (!e.target.classList.contains("skill__item")) {
      const activeItem = document.querySelector(".skill__item.active");
      if (activeItem) {
        activeItem.classList.remove("active");
      }
    }
  }

  setTimeout(() => {
    skillItems.forEach((item) => {
      item.classList.add("spread");
    });
  }, 1000);

  setTimeout(() => {
    skillItems.forEach((item) => {
      item.classList.remove("spread");
    });
  }, 3000);

  skillItems.forEach((item) => {
    item.addEventListener("click", toggleActiveClass);
  });

  window.addEventListener("click", handleWindowClick);
}

// Initialize VanillaTilt for skill items
initVanillaTilt(".skill__item", {
  max: 20,
  scale: 1.1,
  speed: 3500,
  glare: false,
  "max-glare": 0.1,
  transition: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  perspective: 800,
});

// Initialize VanillaTilt for the circle element
initVanillaTilt("#circle", {
  max: 20,
  scale: 1,
  speed: 5500,
  glare: false,
  transition: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  perspective: 2000,
  "full-page-listening": true,
});

// Spread skill items and handle form submission
spreadSkillItems();
const form = document.getElementById("contact-form");
form.addEventListener("submit", handleFormSubmission);

// Add focus/blur events for form inputs and textarea
const inputEls = document.querySelectorAll("#contact-form input");
const labelEls = document.querySelectorAll("#contact-form label");
const textareaEl = document.querySelector("#contact-form textarea");

function addFocusBlurEventsToElement(element, label) {
  element.addEventListener("focus", () => {
    element.classList.add("focus");
    if (!element.value) {
      label.classList.add("focus");
    }
  });

  element.addEventListener("blur", () => {
    element.classList.remove("focus");
    if (!element.value) {
      label.classList.remove("focus");
    }
  });
}

inputEls.forEach((inputEl, index) => {
  if (index <= 2) {
    addFocusBlurEventsToElement(inputEl, labelEls[index]);
  }
});

addFocusBlurEventsToElement(textareaEl, labelEls[2]);

// Handle form submission
async function handleFormSubmission(event) {
  event.preventDefault();
  const status = document.getElementById("contact-form-status");
  const data = new FormData(event.target);

  try {
    const response = await fetch(event.target.action, {
      method: event.target.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.innerHTML = "感謝您的提交！";
      showStatus();
      event.target.reset();
    } else {
      const responseData = await response.json();

      if (responseData.hasOwnProperty("errors")) {
        status.innerHTML = responseData.errors
          .map((error) => error.message)
          .join(", ");
      } else {
        status.innerHTML = "糟糕！提交表單時出現問題";
        showStatus();
      }
    }
  } catch (error) {
    status.innerHTML = "糟糕！提交表單時出現問題";
    showStatus();
  }

  function showStatus() {
    status.classList.add("active");
    setTimeout(() => {
      status.classList.remove("active");
    }, 2000);
    labelEls.forEach((el) => {
      el.classList.remove("focus");
    });
  }
}
