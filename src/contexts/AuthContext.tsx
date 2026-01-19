import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, tokenManager } from '@/services/api';
import { Admin } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = tokenManager.getToken();
      console.log('🔍 Initial auth check, token exists:', !!token);
      
      if (token) {
        try {
          const response = await authApi.getMe();
          console.log('📥 getMe response:', response);
          
          if (response.success && response.data) {
            setIsAuthenticated(true);
            setUser(response.data);
            console.log('✅ User authenticated on mount');
          } else {
            console.log('❌ Invalid token, clearing');
            tokenManager.removeToken();
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error('❌ Auth check failed:', error);
          tokenManager.removeToken();
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        console.log('ℹ️ No token found');
      }
      
      setLoading(false);
      console.log('✅ Auth check complete');
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Login attempt for:', email);
      const response = await authApi.login({ email, password });
      
      console.log('📥 Login response:', {
        success: response.success,
        hasData: !!response.data,
        message: response.message
      });
      
      if (response.success && response.data) {
        const storedToken = tokenManager.getToken();
        console.log('🔑 Token stored:', !!storedToken);
        
        if (!storedToken) {
          console.error('❌ Token storage failed!');
          toast.error('Authentication failed. Please try again.');
          return false;
        }
        
        // Update state
        setIsAuthenticated(true);
        setUser(response.data);
        
        console.log('✅ Auth state updated successfully');
        toast.success('Login successful!');
        return true;
      } else {
        console.log('❌ Login rejected:', response.message);
        toast.error(response.message || 'Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('❌ Login exception:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return false;
    }
  };

  const logout = async () => {
    console.log('🚪 Logging out...');
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      toast.success('Logged out successfully');
      console.log('✅ Logout complete');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}