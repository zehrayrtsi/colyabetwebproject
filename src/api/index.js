

import axios from "axios";
import { BASE_URL, TOKEN_EXPIRE_TIME } from "../constant/api.js";
import { cookies } from "../util/cookie.js";
import { STORAGE_KEYS } from "../context/auth/index.jsx";
import { RefreshToken } from "./UserController/index.js";

const service = axios.create({ baseURL: BASE_URL });

service.interceptors.request.use(
  async (config) => {
    let token = cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
    if (token === undefined || token === null) {
      const refreshToken = cookies.get(STORAGE_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        const response = await RefreshToken(refreshToken);
        token = response.data.token;
        cookies.set(STORAGE_KEYS.ACCESS_TOKEN, token, {
          expires: new Date(Date.now() + TOKEN_EXPIRE_TIME),
        });
      }
    }
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default service;
