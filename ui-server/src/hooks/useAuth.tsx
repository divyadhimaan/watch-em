import { useState, useEffect } from "react";

type SignUpCredentials = { email: string; password: string, username: string };
type LoginCredentials = { email: string; password: string};
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

      // Save token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", credentials.email);
      setToken(data.token);
      setUser(credentials.email);

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

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", credentials.email);
      setToken(data.token);
      setUser(credentials.email);

      return { success: true, message: data.message };
    } catch (err: any) {
      console.error("Login failed:", err.message);
      return { success: false, message: err.message || "Login failed" };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setToken(null);
    setUser(null);
  };

  return { token, user, signup, login, logout, isAuthenticated: !!token };
};
