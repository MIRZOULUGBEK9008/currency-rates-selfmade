// imports
import request from "./request.js";
import updateDOM from "./updateDOM.js";
const data = request;
const updateUI = updateDOM;
// API
const API = "https://exchangerate.onrender.com/data/all";

// Loader
window.onload = () => {
  const elLoader = document.querySelector(".js-loader");
  setTimeout(() => {
    elLoader.classList.add("loader-wrapper--none");
  }, 800);
};

data(API)
  .then((res) => {
    if (res.ok && res.status === 200) {
      return res.json();
    } else {
      throw new Error("404.html");
    }
  })
  .then((res) => {
    const data = res[0]["data"];
    updateUI(data);
  })
  .catch(({ message }) => {
    window.location.pathname = message;
  });
