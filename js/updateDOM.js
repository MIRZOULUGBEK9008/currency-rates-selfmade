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
const elRates = document.querySelectorAll(".js-country-rate-selected-zone");

const countryNameFrom = elRates[0].querySelector(".js-country-name-selected");
const countryNameTo = elRates[1].querySelector(".js-country-name-selected");
const countryFlagFrom = elRates[0].querySelector(".js-country-flag-selected");
const countryFlagTo = elRates[1].querySelector(".js-country-flag-selected");
const changerFrom = {
  name: countryNameFrom.textContent,
  src: countryFlagFrom.src,
};
const changerTo = {
  name: countryNameTo.textContent,
  src: countryFlagTo.src,
};

// Template and Fragment
const countryRateTemplate = document.getElementById(
  "countryRateTemplate"
).content;
const countryRateFragment = document.createDocumentFragment();

const updateDOM = (data) => {
  data.forEach((country) => {
    const { rateCode: code, rate: newRate, name } = country;
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
    const slectedCountryFlag = parent.querySelector(
      ".js-country-flag-selected"
    );
    slectedCountryFlag.src = flag;
    if (parent.classList.contains("select-rate__selected-zone--from")) {
      changerFrom.name = parent.querySelector(
        ".js-country-name-selected"
      ).textContent;
      changerFrom.src = parent.querySelector(".js-country-flag-selected").src;
    } else {
      changerTo.name = parent.querySelector(
        ".js-country-name-selected"
      ).textContent;
      changerTo.src = parent.querySelector(".js-country-flag-selected").src;
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
const elExchangerInner = document.getElementById("exchangerInner");

let saver = true;
swipper.onclick = () => {
  swipper.classList.toggle("exchanger__swipper--rotate");

  if (saver) {
    countryNameFrom.textContent = changerTo.name;
    countryNameTo.textContent = changerFrom.name;
    countryFlagFrom.src = changerTo.src;
    countryFlagTo.src = changerFrom.src;
    saver = false;
  } else {
    countryNameFrom.textContent = changerFrom.name;
    countryNameTo.textContent = changerTo.name;
    countryFlagFrom.src = changerFrom.src;
    countryFlagTo.src = changerTo.src;
    saver = true;
  }
};

// Exchanger input
elExchangeFrom.oninput = ({ target: { value } }) => {
  elExchangeTo.value = value;
};

export default updateDOM;
