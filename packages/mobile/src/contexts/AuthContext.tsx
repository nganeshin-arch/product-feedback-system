import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, AuthTokens } from '@feedback-system/shared';

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  login: (user: User, tokens: AuthTokens) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isModerator: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuthData();
  }, []);

  const loadAuthData = async () => {
    try {
      const [storedUser, storedTokens] = await Promise.all([
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem('tokens'),
      ]);

      if (storedUser && storedTokens) {
        setUser(JSON.parse(storedUser));
        setTokens(JSON.parse(storedTokens));
      }
    } catch (error) {
      console.error('Failed to load auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (newUser: User, newTokens: AuthTokens) => {
    setUser(newUser);
    setTokens(newTokens);
    await Promise.all([
      AsyncStorage.setItem('user', JSON.stringify(newUser)),
      AsyncStorage.setItem('tokens', JSON.stringify(newTokens)),
    ]);
  };

  const logout = async () => {
    setUser(null);
    setTokens(null);
    await Promise.all([AsyncStorage.removeItem('user'), AsyncStorage.removeItem('tokens')]);
  };

  const value: AuthContextType = {
    user,
    tokens,
    login,
    logout,
    isAuthenticated: !!user,
    isModerator: user?.role === 'moderator',
    isLoading,
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
