export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

export const getLocalStorage = (name) => localStorage.getItem(name);

export const setUserInfo = (userInfo) =>
  setLocalStorage("USER_INFO", JSON.stringify(userInfo));

export const getUserInfo = () => getLocalStorage("USER_INFO");
