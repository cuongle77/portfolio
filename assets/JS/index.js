new WOW().init();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let itemLink = $$(".nav__content__icon__menu > li > a");
let itemLinkSideBar = $$(".nav__content__icon__mobile__sidebar > a");
let navIconMobileBtn = $(".nav__content__icon__mobile");
let itemSideBar = $(
  ".nav__content__icon__mobile > .nav__content__icon__mobile__sidebar"
);
let overlayModel = $(
  ".nav__content__icon__mobile > .nav__content__icon__mobile__overlay"
);
let navIconBtn = $(".nav__content__icon");

itemLink.forEach((item, index) => {
  item.onclick = (e) => {
    e.preventDefault();
    $(".active").classList.remove("active");
    item.classList.add("active");

    document
      .getElementById(item.getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth" });
  };
});

itemLinkSideBar.forEach((itemSideBar, index) => {
  itemSideBar.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    document
      .getElementById(itemSideBar.getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth" });

    $(".activeSb").classList.remove("activeSb");
    $(".activeOl").classList.remove("activeOl");
  };
});

navIconBtn.onclick = (e) => {
  let menuItem = navIconBtn.children[1];
  let menuItemChild = Array.from(menuItem.children);

  menuItem.style.opacity = "1";
  menuItem.style.visibility = "visible";

  menuItemChild.forEach((item) => {
    item.style.transform = "rotateX(360deg)";
    item.style.margin = "40px 0";
  });
};

navIconMobileBtn.onclick = () => {
  itemSideBar.classList.add("activeSb");
  overlayModel.classList.add("activeOl");
};

overlayModel.onclick = (e) => {
  e.stopPropagation();
  $(".activeSb").classList.remove("activeSb");
  $(".activeOl").classList.remove("activeOl");
};

// Animate TypingWord
class animationWords {
  constructor(tagContainWords, words, waitTime) {
    this.tagContainWords = tagContainWords;
    this.words = words;
    this.word = "";
    this.indexWords = 0;
    this.waitTime = parseInt(waitTime);
    this.typingWords();
    this.removeWords = false;
  }
}

animationWords.prototype.typingWords = function () {
  // Vị Trí chỉ mục của từ hiện tại
  const currentIndex = this.indexWords % this.words.length;

  //Lấy tất cả cả từ của chữ hiện tại
  const currentWords = this.words[currentIndex];
  if (this.removeWords) {
    this.word = currentWords.substring(0, this.word.length - 1);
  } else {
    this.word = currentWords.substring(0, this.word.length + 1);
  }

  this.tagContainWords.innerHTML = `<span>${this.word}</span>`;

  let speedTypingWords = 80;
  if (this.removeWords) {
    speedTypingWords /= 2;
  }

  if (!this.removeWords && this.word === currentWords) {
    speedTypingWords = this.waitTime;
    this.removeWords = true;
  } else if (this.removeWords && this.word === "") {
    this.removeWords = false;
    this.indexWords++;
    speedTypingWords = 500;
  }

  setTimeout(() => this.typingWords(), speedTypingWords);
};

const run = () => {
  const tagContainWords = $(".typing__words");
  const words = JSON.parse(tagContainWords.getAttribute("data-words"));
  const waitTime = tagContainWords.getAttribute("data-waitTime");

  //Thiết Lập hàm animationWords
  new animationWords(tagContainWords, words, waitTime);
};

document.addEventListener("DOMContentLoaded", run);

// HOME

let homeLinkBtn = $(".home__info__link__share__btn");

homeLinkBtn.onclick = () => {
  let homeLinkList = homeLinkBtn.children[1];

  homeLinkList.style.opacity = "1";
  homeLinkList.style.visibility = "visible";
  homeLinkList.style.transform = "rotate(-45deg)";
  homeLinkList.style.top = "10px";
  homeLinkList.style.left = "107px";
};

let handleHideShow = () => {
  let latestScroll = window.pageYOffset;
  let menuItem = navIconBtn.children[1];
  let menuItemChild = Array.from(menuItem.children);

  if (latestScroll === 0) {
    menuItem.style.opacity = "1";
    menuItem.style.visibility = "visible";

    homeLinkBtn.children[1].style.opacity = "1";
    homeLinkBtn.children[1].style.visibility = "visible";
    homeLinkBtn.children[1].style.transform = "rotate(-45deg)";
    homeLinkBtn.children[1].style.top = "10px";
    homeLinkBtn.children[1].style.left = "107px";

    menuItemChild.forEach((item) => {
      item.style.transform = "rotateX(360deg)";
      item.style.margin = "40px 0";
    });
  } else {
    menuItem.style.opacity = "0";
    menuItem.style.visibility = "hidden";

    homeLinkBtn.children[1].style.opacity = "0";
    homeLinkBtn.children[1].style.visibility = "hidden";
    homeLinkBtn.children[1].style.transform = "rotate(0deg)";
    homeLinkBtn.children[1].style.top = "100%";
    homeLinkBtn.children[1].style.left = "0";

    menuItemChild.forEach((item) => {
      item.style.transform = "rotateX(0deg)";
      item.style.margin = "-24px 0";
    });
  }
};

window.addEventListener("DOMContentLoaded", handleHideShow);
window.addEventListener("scroll", handleHideShow);

// BACK__TO__TOP
let toTopBnt = $("#back__to__top");
let handleToTop = () => {
  let latestScroll = window.pageYOffset;
  if (latestScroll === 0) {
    toTopBnt.style.opacity = "0";
    toTopBnt.style.transition = "all 0.5s";
  } else if (latestScroll >= 1000) {
    toTopBnt.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    toTopBnt.style.opacity = "1";
    toTopBnt.style.transition = "all 0.5s";
  }
};

window.addEventListener("DOMContentLoaded", handleToTop);
window.addEventListener("scroll", handleToTop);
