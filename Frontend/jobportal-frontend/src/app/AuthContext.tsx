import { useMutation,  useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/axios";

  

interface User {
  id: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
  loading :boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setloading] = useState(true);
     const queryClient = useQueryClient();
  // Save to localStorage when user changes
  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
    } else {
      localStorage.removeItem("user");
    }
  };


  // ✅ React Query mutation for logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return api.post("api/users/auth/logout", {}, { withCredentials: true });
    },
    onSuccess: () => {
      // Clear auth state
      setUser(null);
      localStorage.removeItem("user");
      // Invalidate any user-related queries
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };
  

  // Rehydrate on refresh
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUserState(JSON.parse(stored));
    }
    setloading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
