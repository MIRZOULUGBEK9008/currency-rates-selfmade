// HTML selection
const elSelectRateList = document.querySelector(".js-select-rate-list");
const elCountryRateSearch = document.querySelector(".js-country-rate-search");
const elCountryRateSelectedZone = document.querySelector(
  ".js-country-rate-selected-zone"
);
const elCountrySearchList = document.querySelector(".js-country-search-list");
const elCountryNameSelected = document.querySelector(
  ".js-country-name-selected"
);
const elCountryFlageSelected = document.querySelector(
  ".js-country-flag-selected"
);

// Template and Fragment
const countryRateTemplate = document.getElementById(
  "countryRateTemplate"
).content;

const countryRateFragment = document.createDocumentFragment();

// ? Loader
document.addEventListener("DOMContentLoaded", () => {
  const elLoader = document.querySelector(".js-loader");
  setTimeout(() => {
    elLoader.classList.add("loader-wrapper--none");
  }, 800);
});
