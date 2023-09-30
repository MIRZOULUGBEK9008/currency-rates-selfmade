const request = async (api) => {
  const request = await fetch(api);
  return request;
};
export default request;
