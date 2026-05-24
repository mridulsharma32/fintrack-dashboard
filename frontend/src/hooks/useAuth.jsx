import { createContext, useContext, useMemo, useState } from "react";

import { api, clearSession, readStoredUser, storeSession } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  async function login(credentials) {
    const { data } = await api.post("/api/auth/login", credentials);
    storeSession(data);
    setUser(data.user);
    return data.user;
  }

  async function register(payload) {
    const { data } = await api.post("/api/auth/register", payload);
    storeSession(data);
    setUser(data.user);
    return data.user;
  }

  function startDemo() {
    const demoUser = {
      id: "demo",
      name: "Recruiter Demo",
      email: "demo@fintrack.app",
      created_at: new Date().toISOString(),
    };
    localStorage.setItem("fintrack_token", "demo-token");
    localStorage.setItem("fintrack_user", JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  }

  function logout() {
    clearSession();
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, register, startDemo, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
