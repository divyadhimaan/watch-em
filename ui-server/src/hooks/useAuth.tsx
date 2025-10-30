import { useState, useEffect } from "react";

type Credentials = { email: string; password: string };
type AuthResponse = { token: string; message: string };

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("userEmail");
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  // sign up user (calls your Java backend)
  const signup = async (credentials: Credentials) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data: AuthResponse = await response.json();
      console.log("Auth response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", credentials.email);
      setToken(data.token);
      setUser(credentials.email);
      return true;
    } catch (err: any) {
      console.error("Login failed:", err.message);
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setToken(null);
    setUser(null);
  };

  return { token, user, signup, logout, isAuthenticated: !!token };
};
