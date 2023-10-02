// HTML selection
const elSelectRateList = document.querySelectorAll(".js-select-rate-list");
const elCountryRateSearch = document.querySelectorAll(
  ".js-country-rate-search"
);
const elCountryRateSelectedZone = document.querySelectorAll(
  ".js-country-rate-selected-zone"
);
const elExchangeFrom = document.getElementById("exchangeFrom");
const elExchangeTo = document.getElementById("exchangeTo");
const countryNameFrom = elCountryRateSelectedZone[0].querySelector(
  ".js-country-name-selected"
);
const countryNameTo = elCountryRateSelectedZone[1].querySelector(
  ".js-country-name-selected"
);
const countryFlagFrom = elCountryRateSelectedZone[0].querySelector(
  ".js-country-flag-selected"
);
const countryFlagTo = elCountryRateSelectedZone[1].querySelector(
  ".js-country-flag-selected"
);
const changerFrom = {
  name: countryNameFrom.textContent,
  src: countryFlagFrom.src,
  rate: 0,
};
const changerTo = {
  name: countryNameTo.textContent,
  src: countryFlagTo.src,
  rate: 0,
};

// Template and Fragment
const countryRateTemplate = document.getElementById(
  "countryRateTemplate"
).content;
const countryRateFragment = document.createDocumentFragment();

// Variables
let rateFrom, rateTo;

const updateDOM = (data) => {
  data.forEach((country) => {
    const { rateCode: code, rate: newRate, name } = country;
    if (code === "usd") {
      rateFrom = newRate;
      changerFrom.rate = rateFrom;
    }
    if (code === "uzs") {
      rateTo = newRate;
      changerTo.rate = rateTo;
    }
    const img = countryRateTemplate.querySelector(".js-country-flag");
    img.src = `https://hatscripts.github.io/circle-flags/flags/${code.slice(
      0,
      2
    )}.svg`;
    const rate = countryRateTemplate.querySelector(".js-country-rate");
    rate.textContent = name;
    const countryCode = countryRateTemplate.querySelector(".js-country-code");
    countryCode.textContent = code;
    const clone = countryRateTemplate.cloneNode(true);
    clone.lastElementChild.dataset.rate = newRate;
    countryRateFragment.appendChild(clone);
  });
  elSelectRateList.forEach((list) => {
    const clone = countryRateFragment.cloneNode(true);
    list.append(clone);
  });
};

// Toggle menu
elCountryRateSelectedZone.forEach((zone) => {
  zone.onclick = () => {
    zone.classList.toggle("select-rate__selected-zone--active");
  };
});

// Search element
elCountryRateSearch.forEach((search) => {
  search.oninput = ({ target: { value } }) => {
    const forRate = value.toLowerCase().trim();
    const forCode = value.toLowerCase().trim();
    const children = Array.from(
      search.parentElement.nextElementSibling.querySelector(
        ".js-select-rate-list"
      ).children
    );
    children.forEach((child, index) => {
      const rate = child
        .querySelector(".js-country-rate")
        .textContent.toLowerCase();
      const code = child.querySelector(".js-country-code").textContent;
      if (rate.includes(forRate) || code.includes(forCode)) {
        children[index].classList.remove("select-rate__option--hidden");
      } else {
        children[index].classList.add("select-rate__option--hidden");
      }
    });
  };
});
// Active remover
const activeRemover = () => {
  elCountryRateSelectedZone.forEach((zone) => {
    zone.classList.remove("select-rate__selected-zone--active");
    elExchangeFrom.focus();
  });
};

document.body.onclick = ({ target }) => {
  if (target.classList.contains("select-rate__option")) {
    const name = target.querySelector(".js-country-rate");
    const code = target
      .querySelector(".js-country-code")
      .textContent.toUpperCase();
    const flag = target.querySelector(".js-country-flag").src;
    const parent =
      name.parentElement.parentElement.parentElement.parentElement
        .previousElementSibling;
    const selectedCountry = parent.querySelector(".js-country-name-selected");
    selectedCountry.innerHTML = `${code} &centerdot; ${name.textContent}`;
    const selectedCountryFlag = parent.querySelector(
      ".js-country-flag-selected"
    );
    selectedCountryFlag.src = flag;
    if (parent.classList.contains("select-rate__selected-zone--from")) {
      changerFrom.name = parent.querySelector(
        ".js-country-name-selected"
      ).textContent;
      changerFrom.src = parent.querySelector(".js-country-flag-selected").src;
      changerFrom.rate = target.dataset?.rate;
      parent.dataset.rate = changerFrom.rate;
    } else {
      changerTo.name = parent.querySelector(
        ".js-country-name-selected"
      ).textContent;
      changerTo.src = parent.querySelector(".js-country-flag-selected").src;
      changerTo.rate = target.dataset?.rate;
      parent.dataset.rate = changerTo.rate;
    }
  }
  if (
    !target.classList.contains("select-rate__selected-zone") &&
    !target.classList.contains("js-country-rate-search")
  ) {
    activeRemover();
  }
};

document.onkeydown = ({ key }) => {
  if (key === "Escape") activeRemover();
};

// Swipper
const swipper = document.getElementById("swipper");

let saver = true;
swipper.onclick = () => {
  swipper.classList.toggle("exchanger__swipper--rotate");
  elExchangeFrom.value = "";
  elExchangeTo.value = "";
  if (saver) {
    countryNameFrom.textContent = changerTo.name;
    countryNameTo.textContent = changerFrom.name;
    countryFlagFrom.src = changerTo.src;
    countryFlagTo.src = changerFrom.src;
    elCountryRateSelectedZone[0].dataset.rate = changerTo.rate;
    saver = false;
  } else {
    countryNameFrom.textContent = changerFrom.name;
    countryNameTo.textContent = changerTo.name;
    countryFlagFrom.src = changerFrom.src;
    countryFlagTo.src = changerTo.src;
    elCountryRateSelectedZone[1].dataset.rate = changerFrom.rate;
    saver = true;
  }
};

// Exchanger input
elExchangeFrom.oninput = ({ target: { value } }) => {
  if (!saver) {
    elExchangeTo.value = (value / changerTo.rate).toFixed(2);
  } else {
    elExchangeTo.value = (value * changerTo.rate).toFixed(2);
  }
  if (value === "") elExchangeTo.value = "";
};

export default updateDOM;
