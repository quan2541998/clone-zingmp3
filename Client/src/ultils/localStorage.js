export const setItemLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value;
};

export const removeItemLocalStorage = (key) => {
  const value = localStorage.removeItem(key);
};

export const getToken = () => {
  const value = localStorage.getItem("ACCESS_TOKEN");
  return value;
};
