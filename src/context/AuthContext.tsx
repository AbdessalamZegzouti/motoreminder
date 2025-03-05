import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*, agencies(name)')
            .eq('id', session.user.id)
            .single();
          
          if (profileError) throw profileError;
          
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: profile.name || '',
            role: profile.role as UserRole,
            agencyId: profile.agency_id || undefined,
            agencyName: profile.agencies ? profile.agencies.name : undefined
          };
          
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*, agencies(name)')
          .eq('id', session.user.id)
          .single();
        
        if (!profileError && profile) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: profile.name || '',
            role: profile.role as UserRole,
            agencyId: profile.agency_id || undefined,
            agencyName: profile.agencies ? profile.agencies.name : undefined
          };
          
          setUser(userData);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'بيانات الدخول غير ��حيحة');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (agencyName: string, name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data: { user: authUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'agency'
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      if (authUser) {
        const subscriptionEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        
        const { data: agency, error: agencyError } = await supabase
          .from('agencies')
          .insert({
            name: agencyName,
            owner_id: authUser.id,
            subscription_status: 'active',
            subscription_ends: subscriptionEndDate.toISOString()
          })
          .select()
          .single();
        
        if (agencyError) throw agencyError;
        
        if (agency) {
          const { error: profileUpdateError } = await supabase
            .from('profiles')
            .update({ 
              agency_id: agency.id 
            })
            .eq('id', authUser.id);
          
          if (profileUpdateError) throw profileUpdateError;
          
          const { error: settingsError } = await supabase
            .from('settings')
            .insert({
              agency_id: agency.id
            });
          
          if (settingsError) throw settingsError;
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'حدث خطأ أثناء إنشاء حسابك');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
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
