import type { Profile, User } from "@app-types/User";
import { useState, useEffect } from "react";

type SignUpCredentials = { email: string; password: string, username: string };
type LoginCredentials = { email: string; password: string};
type AuthResponse = { 
  token: string; 
  message: string; 
  username: string; 
  avatarUrl: string; 
  userId: string;
  bio: string;
  country: null;
};

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Sign up user
  const signup = async (credentials: SignUpCredentials): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse | { message: string } = await response.json();

      if (!response.ok || !("token" in data)){
        return { success: false, message: data?.message || "Signup failed" };
      }
      const userObj: User = {
        email: credentials.email,
        username: data.username,
      };
      const profileObj: Profile = {
        userId: data.userId,
        avatarUrl: data.avatarUrl,
        country: data.country,
        bio: data.bio,
        favourites: [],
        playlists:[]
      }
      // Save token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("profile", JSON.stringify(profileObj));
      setToken(data.token);
      setUser(userObj);

      return { success: true, message: data.message };
    } catch (err: any) {
      console.error("Signup failed:", err.message);
      return { success: false, message: err.message || "Signup failed" };
    }
  };

  // Login user: For now only using email password
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data: AuthResponse | { message: string } = await response.json();

      if (!response.ok || !("token" in data)) {
        return { success: false, message: data?.message || "Login failed" };
      }

      const userObj: User = {
        email: credentials.email,
        username: data.username,
      };
      const profileObj: Profile = {
        userId: data.userId,
        avatarUrl: data.avatarUrl,
        country: data.country,
        bio: data.bio,
        favourites: [],
        playlists:[]
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("profile", JSON.stringify(profileObj));
      setToken(data.token);
      setUser(userObj);

      return { success: true, message: data.message };
    } catch (err: any) {
      console.error("Login failed:", err.message);
      return { success: false, message: err.message || "Login failed" };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return { token, user, signup, login, logout, isAuthenticated: !!token };
};
