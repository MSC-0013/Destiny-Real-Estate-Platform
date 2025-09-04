import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { getCurrentUser, setCurrentUser } from '@/utils/localStorage';
import { api, setAuthToken } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'tenant' | 'landlord' | 'builder';
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load current user from localStorage on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      if ((currentUser as any).token) setAuthToken((currentUser as any).token);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // Admin shortcut for demo
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          name: 'Admin',
          email: 'admin@gmail.com',
          role: 'admin',
          verified: true,
          createdAt: new Date().toISOString(),
          rating: 5.0,
          reviews: 0,
        };
        setUser(adminUser);
        setCurrentUser(adminUser);
        return { success: true, message: 'Admin login successful!' };
      }

      const resp = await api.post('/auth/login', { email, password });
      const { user: backendUser, token } = resp.data;

      setAuthToken(token);
      const userWithToken = { ...backendUser, token };
      setUser(userWithToken);
      setCurrentUser(userWithToken);

      return { success: true, message: 'Login successful!' };
    } catch (error: any) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Invalid email or password.' };
      }
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      const resp = await api.post('/auth/signup', userData);
      const { user: backendUser, token } = resp.data;

      setAuthToken(token);
      const userWithToken = { ...backendUser, token };
      setUser(userWithToken);
      setCurrentUser(userWithToken);

      return { success: true, message: 'Registration successful!' };
    } catch (error: any) {
      if (error.response?.status === 409) {
        return { success: false, message: 'User with this email already exists. Please log in.' };
      }
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setCurrentUser(null);
    setAuthToken(undefined); // clears axios header
  };

  // Update profile
  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
