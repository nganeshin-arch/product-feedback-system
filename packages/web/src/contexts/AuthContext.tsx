import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthTokens } from '@feedback-system/shared';

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isModerator: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTokens = localStorage.getItem('tokens');

    if (storedUser && storedTokens) {
      try {
        setUser(JSON.parse(storedUser));
        setTokens(JSON.parse(storedTokens));
      } catch (error) {
        console.error('Failed to parse stored auth data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('tokens');
      }
    }
  }, []);

  const login = (newUser: User, newTokens: AuthTokens) => {
    setUser(newUser);
    setTokens(newTokens);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('tokens', JSON.stringify(newTokens));
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
  };

  const value: AuthContextType = {
    user,
    tokens,
    login,
    logout,
    isAuthenticated: !!user,
    isModerator: user?.role === 'moderator',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
