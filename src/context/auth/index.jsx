import * as React from "react";
import { cookies } from "../../util/cookie.js";
import { TOKEN_EXPIRE_TIME } from "../../constant/api.js";

const AuthContext = React.createContext(null);

export const STORAGE_KEYS = {
  USER: "auth.user",
  ACCESS_TOKEN: "auth.access",
  REFRESH_TOKEN: "auth.refresh",
};

function getStoredUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
}

function getStoredTokens() {
  const tokens = {
    [STORAGE_KEYS.ACCESS_TOKEN]: cookies.get(STORAGE_KEYS.ACCESS_TOKEN),
    [STORAGE_KEYS.REFRESH_TOKEN]: cookies.get(STORAGE_KEYS.REFRESH_TOKEN),
  };

  if (
    tokens[STORAGE_KEYS.ACCESS_TOKEN] === undefined ||
    tokens[STORAGE_KEYS.REFRESH_TOKEN] === undefined
  ) {
    return null;
  }

  return tokens;
}

function setStoredUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

function setStoredToken(tokens) {
  if (tokens) {
    cookies.set(STORAGE_KEYS.ACCESS_TOKEN, tokens[STORAGE_KEYS.ACCESS_TOKEN], {
      expires: new Date(Date.now() + TOKEN_EXPIRE_TIME),
    });
    cookies.set(
      STORAGE_KEYS.REFRESH_TOKEN,
      tokens[STORAGE_KEYS.REFRESH_TOKEN],
      { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) },
    );
  } else {
    cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
    cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(getStoredUser());
  const [token, setToken] = React.useState(getStoredTokens());
  const isAuthenticated = !!token;

  const logout = React.useCallback(async () => {
    setStoredUser(null);
    setStoredToken(null);
    setUser(null);
    setToken(null);
  }, []);

  const login = React.useCallback(async (tokens, user) => {
    setStoredUser(user);
    setStoredToken(tokens);
    setUser(user);
    setToken(tokens);
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
    setToken(getStoredTokens());
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
