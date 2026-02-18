"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";

import { authApi } from "@store/authApi";
import { profileApi } from "@store/profileApi";

import type { AuthRequest, AuthResponse } from "@app-types/auth";
import type { UserProfile } from "@app-types/user";

type AuthContextType = {
  token: string | null;
  profile: UserProfile | null;
  signup: (data: AuthRequest) => Promise<boolean>;
  login: (data: AuthRequest) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  /* -------- Fetch Profile -------- */

  const fetchProfile = useCallback(async (jwt: string) => {
    try {
      const data = await profileApi.getMe(jwt);
      setProfile(data);
    } catch (error) {
      console.error("Profile fetch failed:", error);
      logout();
    }
  }, []);

  /* -------- Restore Session -------- */

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchProfile(savedToken);
    }
  }, [fetchProfile]);

  /* -------- Handle Auth Success -------- */

  const handleAuthSuccess = async (data: AuthResponse) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);

    await fetchProfile(data.token);
  };

  /* -------- Signup -------- */

  const signup = async (credentials: AuthRequest) => {
    try {
      const data = await authApi.signup(credentials);
      await handleAuthSuccess(data);
      return true;
    } catch {
      return false;
    }
  };

  /* -------- Login -------- */

  const login = async (credentials: AuthRequest) => {
    try {
      const data = await authApi.login(credentials);
      await handleAuthSuccess(data);
      return true;
    } catch {
      return false;
    }
  };

  /* -------- Logout -------- */

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        profile,
        signup,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
