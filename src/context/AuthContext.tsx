
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'agency' | 'admin' | 'super-admin';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agencyId?: string;
  agencyName?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (agencyName: string, name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate checking for existing session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('motoUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let mockUser: User;
      
      if (email === 'admin@motopay.com') {
        mockUser = {
          id: '1',
          name: 'مشرف النظام',
          email: 'admin@motopay.com',
          role: 'super-admin'
        };
      } else if (email === 'agency@motopay.com') {
        mockUser = {
          id: '2',
          name: 'أحمد محمد',
          email: 'agency@motopay.com',
          role: 'agency',
          agencyId: 'a1',
          agencyName: 'الفارس للدراجات'
        };
      } else {
        throw new Error('بيانات الدخول غير صحيحة');
      }
      
      setUser(mockUser);
      localStorage.setItem('motoUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (agencyName: string, name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we're not actually creating a new user
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'agency',
        agencyId: `a${Date.now()}`,
        agencyName
      };
      
      setUser(mockUser);
      localStorage.setItem('motoUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('motoUser');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
