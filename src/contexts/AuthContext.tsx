import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { getCurrentUser, setCurrentUser, getAllUsers, addUser } from '@/utils/localStorage';
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'tenant' | 'landlord' | 'builder';
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Check for admin credentials
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          name: 'Admin',
          email: 'admin@gmail.com',
          role: 'admin',
          verified: true,
          createdAt: new Date().toISOString(),
          rating: 5.0,
          reviews: 0
        };
        setUser(adminUser);
        setCurrentUser(adminUser);
        return { success: true, message: 'Admin login successful!' };
      }

      // Check for regular users
      const users = getAllUsers();
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        return { success: false, message: 'User not found. Please register first.' };
      }

      // In a real app, you would verify the password hash
      // For demo purposes, we'll accept any password
      setUser(foundUser);
      setCurrentUser(foundUser);
      return { success: true, message: 'Login successful!' };
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; message: string }> => {
    try {
      const users = getAllUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'User with this email already exists.' };
      }

      const newUser: User = {
        id: uuidv4(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        phone: userData.phone,
        verified: false,
        createdAt: new Date().toISOString(),
        rating: 0,
        reviews: 0
      };

      addUser(newUser);
      setUser(newUser);
      setCurrentUser(newUser);
      
      return { success: true, message: 'Registration successful!' };
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      setCurrentUser(updatedUser);
    }
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};