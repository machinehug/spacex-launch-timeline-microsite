"use strict";

fetch("https://api.spacexdata.com/v3/launches/past")
  .then(response => response.json())
  .then(getSpaceXPastLaunches)
  .catch(() => location.href = "index.html")

function getSpaceXPastLaunches(json) {

  const loader = document.querySelector(".loader-container");
  loader.classList.add("hidden");

  let launches = json;

  const sortWrapper = document.querySelector(".sort-wrapper");
  sortWrapper.classList.remove("hidden");

  const sortBtn = document.querySelector("#sort");
  sortBtn.addEventListener("change", sortBy);

  function sortBy() {

    if (sortBtn.value === "ascending") {

      let sortAscending = Object.values(launches).sort(compareAscending);
      writeHTML(sortAscending);
    };

    if (sortBtn.value === "descending") {

      let sortDescending = Object.values(launches).sort(compareDescending);
      writeHTML(sortDescending);
    };
  };

  writeHTML(launches);
};

function compareAscending(a, b) {

  return a.flight_number - b.flight_number;
};

function compareDescending(a, b) {

  return b.flight_number - a.flight_number;
};

function writeHTML(launches) {

  let html = "";

  //check if all the flickr imgs have been used before
  //and check if the value is the same
  //if not part of the flickr images, then use the fallback img
  let usedImgs = [];

  for (let i = 0; i < launches.length; i++) {

    let jsonDate = new Date(launches[i].launch_date_local);
    const date = jsonDate.toLocaleDateString();
    let readAbleTime = jsonDate.toLocaleTimeString();
    let time = readAbleTime.substring(0, readAbleTime.length - 3);
    const missionName = launches[i].mission_name;
    const flightNumber = launches[i].flight_number;
    const rocket = launches[i].rocket.rocket_name;
    const launchSite = launches[i].launch_site.site_name_long;
    let launchSuccess = launches[i].launch_success;
    let details = launches[i].details;
    const article = launches[i].links.article_link;
    const fallbackImg = launches[i].links.mission_patch;
    let ships = launches[i].ships;
    let year = launches[i].launch_year;

    let allImgs = launches[i].links.flickr_images;

    let img = fallbackImg;


    for (let j = 0; j < allImgs.length; j++) {

      if (usedImgs.includes(allImgs[j])) {

        continue;
      } else {

        img = allImgs[j].replace("_o.", "_h.");
        usedImgs.push(allImgs[j]);
        break;
      };
    };

    if (ships.length) {

      ships = loopShips(ships);
    } else {

      ships = "No ships";
    };

    if (!isEmpty(launchSuccess)) {

      launchSuccess = "successfully";
    } else {

      launchSuccess = "unsuccessfully";
    };

    if (isEmpty(details)) {

      details = "";
    };

    html += `
    <section class="padding border launch-container">

    <hh1 class="title-launch-flight-number">
      Flight number ${flightNumber}
    </h1>

    <h2 class="title title-launch-bigger mission-title">
      <strong>
        MISSION ${missionName}
      </strong>
    </h2>

    <h3 class="title title-launch-bigger launch-year">
      <strong>
        ${year}
    </strong>
    </h3>

    <h4 class="title-launch-rocket-ship title-rocket">
      <strong>
        ROCKET
      </strong>
      ${rocket}
    </h4>

    <h5 class="title-launch-rocket-ship title-ship">
      ${ships}
    </h5>

    <p class="success-container">
      Launched ${launchSuccess} at ${date} ${time} from ${launchSite}.
    </p>

    <hr>

    <div class="img-container">
    <img class="launch-img-container img" src="${img}" alt="SpaceX picture">
    </div>

    <hr>

    <div>
    <h6 class="title-details">
      <strong>
        Details
      </strong>
    </h6>
    <p class="txt launches-details-txt">
      ${details}
    </p>
    <br />
    <p class="txt">
    Read more <a href="${article}" class="redirect-link">here</a>.
    </p>
    </div>

    </section>
    `;
  };

  const launchContainer = document.querySelector(".launch-wrapper");
  launchContainer.innerHTML = html;

  const endTxt = document.querySelector(".txt-end-launch");
  endTxt.innerHTML = `End of timeline. For upcoming SpaceX launches, go to RocketLaunch Live <a href="https://www.rocketlaunch.live/?filter=spacex" title="opens another website" class="redirect-link">here</a>.`;
};

function isEmpty(e) {

  if (e === null || e === "" || e === false || e === undefined) {

    return true;
  } else {

    return false;
  };
};

//scroll to top btn
window.addEventListener("scroll", onScrollDown);

function onScrollDown() {

  if (document.documentElement.scrollTop) {

    toTopOfPageBtn.classList.remove("hidden");
    toTopOfPageBtn.classList.add("on-scroll");
  } else {

    toTopOfPageBtn.classList.add("hidden");
    toTopOfPageBtn.classList.remove("on-scroll");
  };
};

const toTopOfPageBtn = document.querySelector(".to-top-of-page");
toTopOfPageBtn.addEventListener("click", scrollToTopOfPage);

function scrollToTopOfPage() {

  const topOfPageId = document.querySelector("#top-of-page")

  topOfPageId.scrollIntoView();
};

function loopShips(e) {

  let html = "";

  let comma = ", ";

  let and = "";

  for (let i = 0; i < e.length; i++) {

    if (i === e.length - 1) {
      comma = "";
      and = " and "
    };

    if (i === e.length - 2 || i === e.length - 2) {
      comma = "";
    };

    if (e.length <= 1) {
      and = "";
    };

    html += `<span class="ship-txt">${and}${e[i]}</span>` + comma;
  };

  return `Ships - ${html}`;
};
