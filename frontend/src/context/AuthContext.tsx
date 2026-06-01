import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  email: string;
  role: 'intern' | 'mentor' | 'hr';
  name: string;
  department: string;
  mbti?: string;
  intern_type?: 'summer' | 'daily';
  onboarding_completed?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // 验证token是否有效
          const data = await authService.getProfile();
          setUser(data.user);
          setToken(storedToken);
        } catch (error) {
          // token无效，清除存储
          authService.logout();
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    setToken(data.token);
  };

  const register = async (data: any) => {
    const response = await authService.register(data);
    setUser(response.user);
    setToken(response.token);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading,
      login, 
      register, 
      logout, 
      isAuthenticated: !!token && !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
