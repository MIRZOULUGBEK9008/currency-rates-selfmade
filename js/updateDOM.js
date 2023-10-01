// HTML selection
const elSelectRateList = document.querySelectorAll(".js-select-rate-list");
const elCountryRateSearch = document.querySelectorAll(
  ".js-country-rate-search"
);
const elCountryRateSelectedZone = document.querySelectorAll(
  ".js-country-rate-selected-zone"
);
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

swipper.onclick = () => {
  elExchangerInner.classList.toggle("exchanger__inner--reverse");
};

export default updateDOM;
