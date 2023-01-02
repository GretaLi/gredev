// project page

import { projectData } from "./data.js";
console.log(projectData);

let newData = projectData.filter(function (obj) {
  return obj.feature === true;
});

const tabs = document.querySelectorAll(".tab__btn");
const projectWrapepr = document.querySelector("#project-wrapper");

let cardHTML = "";

createCard(newData);
renderCards();

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault;

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    tab.classList.add("active");

    let currentTab = tab.getAttribute("id");
    let isSlected = tab.classList.contains("active");

    if (currentTab === "featured" && isSlected) {
      newData = projectData.filter(function (obj) {
        return obj.feature === true;
      });
    }

    if (currentTab !== "featured" && isSlected) {
      newData = projectData.filter(function (obj) {
        return obj.tab === currentTab;
      });
    }

    createCard(newData);
    renderCards();

    modalToggles = document.querySelectorAll(".toggle-modal");
    overlays = document.querySelectorAll(".project__modal-overlay");
    openModal(modalToggles, overlays);
    return;
  });
});

function createCard(objArr) {
  cardHTML = "";
  for (let obj of objArr) {
    let tab = obj.tab;
    // let link = obj.link;
    let repoUrl = obj.repoUrl;
    let liveUrl = obj.liveUrl;
    let imgUrl = obj.imgUrl;
    let title = obj.title;
    let description = obj.description;
    let tagArr = obj.tag;
    let period = obj?.period;
    let featured = isFeatured();

    function isFeatured() {
      return obj.feature ? "featured" : "";
    }

    let tagHTML = "";
    let tags = createTagHTML();

    cardHTML += `
      <div class="project__item ${featured}" data-tab="${tab}">
        <div class="project__img">
          <a class="toggle-modal" href="#">
              <img
                src="${imgUrl}"
                alt="a picture of ${title}"
                />
          </a>
        </div>

        <div class="project__text">
            <a class="toggle-modal" href="#">
              <h3>${title}</h3>
            </a>
            <div class="project__technique tag">
              ${tags}
            </div>
            <p>
              ${period}
            </p>
        </div>
        <div class="project__modal-overlay">
          <div class="project__modal">
            <img
              src="${imgUrl}"
              alt="a picture of Crowfunding Prdocut Page"
            />
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="project__modal-button">
                <a href="${liveUrl}" target="__blank">Live Site</a>
                <a href="${repoUrl}" target="__blank">Repository</a>
            </div>
          </div>
        </div>
      </div>
    `;

    function createTagHTML() {
      for (let tag of tagArr) {
        tagHTML += `<span>${tag}</span> `;
      }
      return tagHTML;
    }
  }

  return cardHTML;
}

function renderCards() {
  projectWrapepr.innerHTML = cardHTML;
}

let modalToggles = document.querySelectorAll(".toggle-modal");
let overlays = document.querySelectorAll(".project__modal-overlay");

openModal(modalToggles, overlays);
function openModal(modalToggles, overlays) {
  modalToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      let target = e.target;
      let projectItem = target.parentElement.parentElement.parentElement;
      projectItem.classList.add("active");
    });
  });

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      let projectItem = e.target.parentElement;
      projectItem.classList.remove("active");
    });
  });
}
