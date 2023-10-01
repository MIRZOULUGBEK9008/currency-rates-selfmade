// imports
import loader from "./loader.js";
import request from "./request.js";
import updateDOM from "./updateDOM.js";
const data = request;
const updateUI = updateDOM;
// API
const API = "https://exchangerate.onrender.com/data/all";

data(API)
  .then((res) => {
    if (res.ok && res.status === 200) {
      loader(false);
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
