fetch("https://api.spacexdata.com/v3/info")
  .then(response => response.json())
  .then(getCompanyInfo)
  .catch(() => location.href = "index.html")

function getCompanyInfo(json) {

  let companyInfoJson = json.summary;

  let companyInfo = companyInfoJson.replace("SpaceX", "");

  const companyInfoContainer = document.querySelector(".company-info-container");

  companyInfoContainer.innerText = companyInfo;
};
