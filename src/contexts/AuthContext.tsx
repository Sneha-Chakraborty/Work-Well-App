
import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  name: string;
  email?: string;
  phoneNumber?: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.isAuthenticated) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        // Clear invalid stored user
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData: User) => {
    // Ensure we have at least email or phoneNumber
    if (!userData.email && !userData.phoneNumber) {
      console.error('Login failed: User must have either email or phoneNumber');
      return;
    }
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify({
      ...userData,
      isAuthenticated: true,
    }));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
