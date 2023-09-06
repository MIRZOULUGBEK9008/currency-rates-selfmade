import countryCodes from "./countryCodes.js";

// ? Loader
document.addEventListener('DOMContentLoaded', () => {
  const elLoader = document.querySelector('.js-loader');
  setTimeout(() => {
    elLoader.classList.add('loader-wrapper--none');
  }, 800);
});

// Variables
const apiKey = "aa1a46ce5318650594f4612d";
const api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const flagsOfCountriesSource = `https://hatscripts.github.io/circle-flags/flags/countryCode.svg`;
