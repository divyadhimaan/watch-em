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
import { HttpError } from "@store/httpClient";

import type { AuthRequest, AuthResponse } from "@app-types/auth";
import type { UserProfile } from "@app-types/User";

type AuthContextType = {
  token: string | null;
  profile: UserProfile | null;
  signup: (data: AuthRequest, avatarUrl?: string) => Promise<boolean>;
  login: (data: AuthRequest) => Promise<boolean>;
  loginWithGoogle: (idToken: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (body: Partial<UserProfile>) => Promise<boolean>;
  isAuthenticated: boolean;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  /* -------- Logout -------- */

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
    }
    setToken(null);
    setProfile(null);
  }, []);

  /* -------- Fetch Profile -------- */

  const fetchProfile = useCallback(
    async (jwt: string): Promise<boolean> => {
      try {
        const data = await profileApi.getMe(jwt);
        setProfile(data);
        if (typeof window !== "undefined") {
          localStorage.setItem("profile", JSON.stringify(data));
        }
        return true;
      } catch (error) {
        console.error("Profile fetch failed:", error);
        // Clear the session when the server says this user/profile doesn't exist.
        if (error instanceof HttpError && (error.status === 401 || error.status === 404)) {
          logout();
        }
        return false;
      }
    },
    [logout]
  );


  /* -------- Restore Session -------- */

  useEffect(() => {
    const savedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!savedToken) {
      setIsReady(true);
      return;
    }

    setToken(savedToken);

    // Hydrate from cache immediately so the UI doesn't flash unauthenticated
    const cachedProfile =
      typeof window !== "undefined" ? localStorage.getItem("profile") : null;
    if (cachedProfile) {
      try {
        setProfile(JSON.parse(cachedProfile));
      } catch {
        // ignore malformed cache
      }
    }

    fetchProfile(savedToken).finally(() => {
      setIsReady(true);
    });
  }, [fetchProfile]);

  /* -------- Handle Auth Success -------- */

  const handleAuthSuccess = async (data: AuthResponse): Promise<boolean> => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
    }
    setToken(data.token);

    return fetchProfile(data.token);
  };

  /* -------- Signup -------- */

  const signup = async (credentials: AuthRequest, avatarUrl?: string) => {
    try {
      const data = await authApi.signup({ ...credentials, avatarUrl });
      return await handleAuthSuccess(data);
    } catch {
      return false;
    }
  };

  /* -------- Login -------- */

  const login = async (credentials: AuthRequest) => {
    try {
      const data = await authApi.login(credentials);
      return await handleAuthSuccess(data);
    } catch {
      return false;
    }
  };

  /* -------- Login with Google -------- */

  const loginWithGoogle = async (idToken: string) => {
    try {
      const data = await authApi.google(idToken);
      return await handleAuthSuccess(data);
    } catch {
      return false;
    }
  };

  /* -------- Update Profile -------- */

  const updateProfile = async (body: Partial<UserProfile>) => {
    if (!token) return false;
    try {
      const updated = await profileApi.updateMe(token, body);
      setProfile(updated);
      return true;
    } catch (error) {
      console.error("Profile update failed:", error);
      return false;
    }
  };



  return (
    <AuthContext.Provider
      value={{
        token,
        profile,
        signup,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
        isAuthenticated: !!token && !!profile,
        isReady,
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
