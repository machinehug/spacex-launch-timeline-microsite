//slow bg scroll
//start at 0, then calculate
const html = document.querySelector("html");

html.style.backgroundPositionY = window.pageYOffset;

document.onscroll = function () {

  let pxPerScroll = window.pageYOffset;

  window.onscroll = () => {

    html.style.backgroundPositionY = pxPerScroll * 0.3 + "px";
  };
};

//match the href in the html tag with the actual current url
//only works with urls
let currentUrl = location.pathname.split("/")[2];
const nav = document.querySelectorAll(".nav-desktop-li");

nav.forEach(item => {

  if (item.getAttribute("href") === currentUrl) {
    item.className = "active";
  };
});
