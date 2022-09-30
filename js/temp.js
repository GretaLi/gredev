// project page

const data = [
  {
    tab: "website",
    feature: true,
    link: "#",
    imgUrl: "./image/yetta-studio-landing-page.png",
    title: "Yetta’s Studio Landing Page",
    tag: ["HTML", "CSS/SCSS", "jQuery"],
  },

  {
    tab: "website",
    feature: true,
    link: "#",
    imgUrl: "./image/space-travel-website.png",
    title: "Space Travel Website",
    tag: ["HTML", "CSS", "Vanilla JS"],
  },

  {
    tab: "webApp",
    feature: true,
    link: "#",
    imgUrl: "./image/todo-list-web-app.png",
    title: "Todo List Web APP",
    tag: ["HTML", "CSS", "Vanilla JS"],
  },

  {
    tab: "website",
    feature: true,
    link: "#",
    imgUrl: "./image/crowfunding-product-page.png",
    title: "Crowdfunding Product Page",
    tag: ["HTML", "SCSS", "JavaScript", "jQuery"],
  },

  {
    tab: "website",
    feature: true,
    link: "#",
    imgUrl: "./image/chattalker-landing-page.png",
    title: "ChatTalker Langing Page",
    tag: ["HTML", "CSS/SCSS", "jQuery"],
  },
];

let newData = data;

let selectedTabs = [];
const tabs = document.querySelectorAll(".tab__link");
const projectWrapepr = document.querySelector("#project-wrapper");
tabs.forEach((tab) => {
  let filteredData = addObj(selectedTabs);
  createCard(data);
  renderCards();

  tab.addEventListener("click", (e) => {
    e.preventDefault;
    e.target.classList.toggle("active");
    let currentTab = tab.getAttribute("id");
    let isSlected = tab.classList.contains("active");
    console.log(filteredData);
    // if (currentTab === "featured" && isSlected) {
    //   console.log("me");
    //   createCard(data);
    //   renderCards();
    //   return;
    // }

    if (isSlected) {
      selectedTabs.push(currentTab);
    }

    if (!isSlected) {
      for (i in selectedTabs) {
        if (selectedTabs[i] === currentTab) {
          selectedTabs.splice(i, 1);
        }
      }
    }

    filteredData = addObj(selectedTabs);

    if (filteredData.length === 0) {
      console.log("nothin");
      cardHTML = `
              <div class="project__item empty">
                <p><i class="fa-solid fa-arrow-up"></i> Please select a tab <i class="fa-solid fa-arrow-up"></i><p>
              </div>
              `;
      renderCards();
      return;
    }

    if (filteredData.length >= 0) {
      //   cardHTML = "";
      createCard(filteredData);
      renderCards();
    }
  });
});

function addObj(selectedTabs) {
  let filteredData = [];

  for (tab of selectedTabs) {
    for (obj of data) {
      if (tab === obj.tab) {
        filteredData.push(obj);
      }
    }
  }
  return filteredData;
}

function createCard(objArr) {
  cardHTML = "";
  for (obj of objArr) {
    let tab = obj.tab;
    let link = obj.link;
    let imgUrl = obj.imgUrl;
    let title = obj.title;
    let tagArr = obj.tag;

    let tagHTML = "";
    let tags = createTagHTML();

    cardHTML += `
    <div class="project__item" data-tab="${tab}">
              <div class="project__img">
                <a href="${link}">
                  <img
                    src="${imgUrl}"
                    alt="a picture of Crowfunding Prdocut Page"
                  />
                </a>
              </div>

              <div class="project__text">
                <a href="${link}">
                  <h3>${title}</h3>
                </a>
                <div class="project__technique tag">
                  ${tags}
                </div>
              </div>
            </div>
    `;

    function createTagHTML() {
      for (tag of tagArr) {
        tagHTML += `<span>${tag}</span> `;
      }
      return tagHTML;
    }
  }
  //   console.log(cardHTML);
  return cardHTML;
}

function renderCards() {
  projectWrapepr.innerHTML = cardHTML;
}
