export const updateConfigToken = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  config.headers.Authorization = `Bearer ${
    getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
  }`;
};
let token = "";
const storedToken = localStorage.getItem("user");
if (storedToken) {
  const parsedToken = JSON.parse(storedToken);
  token = parsedToken.token;
}
export const config = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};
