import loader from "./loader.js";
const request = async (api) => {
  loader(true);
  const request = await fetch(api);
  return request;
};
export default request;
