import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/AuthService";
import { User } from "../models/User";
import type { IUser } from "../models/User";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (user: IUser) => { success: boolean; message: string };
  logout: () => void;
  updateUser: (updated: Partial<IUser>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  const login = (email: string, password: string) => {
    const result = authService.login(email, password);
    if (result.success) {
      setUser(authService.getCurrentUser());
    }
    return result;
  };

  const register = (newUser: IUser) => {
    const result = authService.register(newUser);
    if (result.success) {
      setUser(authService.getCurrentUser());
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updated: Partial<IUser>) => {
    const result = authService.updateCurrentUser(updated);
    setUser(result);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
