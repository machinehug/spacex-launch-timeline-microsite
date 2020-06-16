const navMobile = document.querySelector(".nav-mobile");
const navDesktop = document.querySelector(".nav-desktop");

const wrapper = document.querySelector(".wrapper");
const hamburger = document.querySelector(".hamburger");
const cross = document.querySelector(".cross");

const mediaQueryDesktop = window.matchMedia("(min-width: 800px)");
const mediaQueryMobile = window.matchMedia("(max-width: 799px)");

const navMobileWrapper = document.querySelector(".open-close-nav-wrapper");

window.addEventListener("resize", checkForResize);

function checkForResize() {

  //more than 720px
  if (window.innerWidth > 900) {

    navMobileWrapper.classList.add("hidden");
    navDesktop.classList.remove("hidden");
    navMobile.classList.add("hidden");
    hamburger.classList.add("hidden");
    cross.classList.add("hidden");
    wrapper.classList.remove("hidden");
  };

  //less than 720px
  if (window.innerWidth < 900) {

    navMobileWrapper.classList.remove("hidden");
    navDesktop.classList.add("hidden");
    navMobile.classList.add("hidden");
    hamburger.classList.remove("hidden");
    cross.classList.add("hidden");
    wrapper.classList.remove("hidden");
  };
};

checkForResize();

//open mobile nav
hamburger.addEventListener("click", function () {
  hamburger.classList.add("hidden");
  cross.classList.remove("hidden");
  navMobile.classList.remove("hidden");
  wrapper.classList.add("hidden");
  navDesktop.classList.add("hidden");
});

//close mobile nav
cross.addEventListener("click", function () {
  hamburger.classList.remove("hidden");
  cross.classList.add("hidden");
  navMobile.classList.add("hidden");
  wrapper.classList.remove("hidden");
  navDesktop.classList.add("hidden");
});
