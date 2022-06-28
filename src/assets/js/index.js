new WOW().init();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const menuFixedIcon = $$('#menu-fixed .menu-fixed-item-icon');
const sectionBlock = $$(".home__spacing");
const itemLinkSideBar = $$(
  ".nav__content__icon__mobile__sidebar > .sidebar__list > a"
);

const menuFixed = $('#menu-fixed');
const btnShowFixedMenu = $('.btn-hidden-menu button');
const navIconMobileBtn = $(".nav__content__icon__mobile");
const itemSideBar = $(
  ".nav__content__icon__mobile > .nav__content__icon__mobile__sidebar"
);
const overlayModel = $(
  ".nav__content__icon__mobile > .nav__content__icon__mobile__overlay"
);
const homeLinkBtn = $(".home__info__link__share__btn");
const navSideBarClose = $(
  ".nav__content__icon__mobile__sidebar > .sidebar__close"
);

const scrollActionSection = () => {
  let current = '';
  const { pageYOffset } = window;
  sectionBlock.forEach(item => {
    const section = item.offsetTop;
    const sectionHeight = item.clientHeight;
    if (pageYOffset >= (section - sectionHeight / 3)) current = item.getAttribute('id');
  });

  menuFixedIcon.forEach((item) => {
    const dataLink = item.getAttribute('data-link');
    if (current === dataLink) item.classList.add("active");
    else item.classList.remove("active");
  });
}

menuFixedIcon.forEach((item) => {
  item.onclick = () => {
    $(".active").classList.remove("active");
    item.classList.add("active");

    document
      .getElementById(item.getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth" });
  }
});

btnShowFixedMenu.onclick = () => {
  menuFixed.classList.toggle('hidden')
}

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const maxWidth = 1239;
  if (width <= maxWidth) {
    menuFixed.classList.add('hidden')
  } else {
    menuFixed.classList.remove('hidden')
  }
});

itemLinkSideBar.forEach((itemSideBar) => {
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

navIconMobileBtn.onclick = () => {
  itemSideBar.classList.add("activeSb");
  overlayModel.classList.add("activeOl");
};

navSideBarClose.onclick = (e) => {
  e.stopPropagation();
  $(".activeSb").classList.remove("activeSb");
  $(".activeOl").classList.remove("activeOl");
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

const runTypingWords = () => {
  const tagContainWords = $(".typing__words");
  const words = JSON.parse(tagContainWords.getAttribute("data-words"));
  const waitTime = tagContainWords.getAttribute("data-waitTime");

  //Thiết Lập hàm animationWords
  new animationWords(tagContainWords, words, waitTime);
};

// HOME
homeLinkBtn.onclick = () => {
  const { style } = homeLinkBtn.children[1];

  style.opacity = "1";
  style.visibility = "visible";
  style.transform = "rotate(-45deg)";
  style.top = "10px";
  style.left = "107px";
};

const handleHideShow = () => {
  const { pageYOffset } = window;
  const { children } = homeLinkBtn;
  const { style } = children[1];

  if (pageYOffset === 0) {
    style.opacity = "1";
    style.visibility = "visible";
    style.transform = "rotate(-45deg)";
    style.top = "10px";
    style.left = "107px";
  } else {
    style.opacity = "0";
    style.visibility = "hidden";
    style.transform = "rotate(0deg)";
    style.top = "100%";
    style.left = "0";
  }
};

// BACK__TO__TOP
const toTopBtn = $("#back__to__top");
const handleScrollToTop = () => {
  const { pageYOffset, scrollTo } = window;
  const { style } = toTopBtn;
  const positionScroll = { top: 0, behavior: "smooth" };

  if (pageYOffset === 0) {
    style.opacity = "0";
    style.visibility = "hidden";
    style.transition = "all 0.5s";
  } else if (pageYOffset >= 1000) {
    toTopBtn.onclick = () => scrollTo(positionScroll);

    style.opacity = "1";
    style.visibility = "visible";
    style.transition = "all 0.5s";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  handleScrollToTop();
  handleHideShow();
  runTypingWords();
  scrollActionSection();
});
window.addEventListener("scroll", () => {
  handleScrollToTop();
  handleHideShow();
  scrollActionSection();
});
