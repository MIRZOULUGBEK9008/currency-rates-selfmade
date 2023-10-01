// Loader
const loader = (switcher) => {
  const elLoader = document.querySelector(".js-loader");
  if (switcher) {
    elLoader.classList.remove("loader-wrapper--none");
  } else {
    setTimeout(() => {
      elLoader.classList.add("loader-wrapper--none");
    }, 800);
  }
};

export default loader;
