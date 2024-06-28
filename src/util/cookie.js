import Cookies from "universal-cookie";

export const cookies = new Cookies(null, {
  expires: new Date(Date.now() + 1000 * 60 * 60),
});
