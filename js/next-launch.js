//get next launch date
fetch("https://api.spacexdata.com/v3/launches/upcoming")
  .then(response => response.json())
  .then(getLaunchDate)
  .catch(() => location.href = "index.html")

const nextLaunch = document.querySelector(".next-launch");

function getLaunchDate(json) {

  let jsonDate = new Date(json[0].launch_date_local);
  let date = jsonDate.toLocaleDateString();
  let readAbleTime = jsonDate.toLocaleTimeString();
  let time = readAbleTime.substring(0, readAbleTime.length - 3);

  nextLaunch.innerText = "Next launch " + date + " at " + time + " GMT+2";
};
