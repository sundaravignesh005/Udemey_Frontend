import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type Role = "student" | "instructor";

interface AuthState {
  token: string | null;
  userId: string | null;
  roles: Role[];
  currentRole: Role;
  name?: string;
  email?: string;
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (data: AuthState) => void;
  logout: () => void;
  switchRole: (role: Role) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "authState";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      token: null,
      userId: null,
      roles: [],
      currentRole: "student",
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (data: AuthState) => {
    setState({
      token: data.token,
      userId: data.userId,
      roles: data.roles || ["student"],
      currentRole: data.currentRole || "student",
      name: data.name,
      email: data.email,
    });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      token: null,
      userId: null,
      roles: [],
      currentRole: "student",
    });
  };

  const switchRole = async (role: Role) => {
    if (!state.token) return;
    await axios.put(
      "http://localhost:8080/userAuth/switch-role",
      { role },
      { headers: { Authorization: `Bearer ${state.token}` } }
    );
    setState((prev) => ({ ...prev, currentRole: role }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isAuthenticated: !!state.token,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

