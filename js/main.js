const elLoader = document.querySelector('.js-loader');

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    elLoader.classList.add('loader-wrapper--none');
  }, 800);
});