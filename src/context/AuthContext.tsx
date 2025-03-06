
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
        console.log("Checking auth state...");
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }
        
        if (session) {
          console.log("Session found, fetching profile data");
          
          try {
            // Fetch profile using the security definer function to avoid recursion
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*, agencies(name)')
              .eq('id', session.user.id)
              .single();
            
            if (profileError) {
              console.error("Profile fetch error:", profileError);
              throw profileError;
            }
            
            if (profile) {
              const userData: User = {
                id: session.user.id,
                email: session.user.email || '',
                name: profile.name || '',
                role: profile.role as UserRole,
                agencyId: profile.agency_id || undefined,
                agencyName: profile.agencies ? profile.agencies.name : undefined
              };
              
              console.log("User data loaded successfully:", userData);
              setUser(userData);
            } else {
              console.error("No profile found for user");
              setUser(null);
            }
          } catch (error) {
            console.error("Error in profile fetching:", error);
            setUser(null);
          }
        } else {
          console.log("No active session found");
          setUser(null);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
        console.log("Auth check complete, isLoading set to false");
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in, fetching profile data");
        try {
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
            
            console.log("User profile loaded after sign-in:", userData);
            setUser(userData);
          } else {
            console.error("Error fetching profile after sign-in:", profileError);
            setUser(null);
          }
        } catch (error) {
          console.error("Error loading profile after sign-in:", error);
          setUser(null);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log("User signed out, clearing user data");
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
      console.log("Attempting login with:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      console.log("Login successful");
      
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'بيانات الدخول غير صحيحة');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (agencyName: string, name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Step 1: Create the user account
      console.log("Creating user with email:", email);
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
        console.log("User created successfully, setting up agency");
        // Calculate subscription end date (30 days from now)
        const subscriptionEndDate = new Date();
        subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
        
        // Step 2: Create the agency record
        try {
          const { data: agency, error: agencyError } = await supabase
            .from('agencies')
            .insert({
              name: agencyName,
              owner_id: authUser.id,
              subscription_status: 'active',
              subscription_ends: subscriptionEndDate.toISOString() // Convert Date to ISO string for Supabase
            })
            .select()
            .single();
          
          if (agencyError) throw agencyError;
          
          console.log("Agency created successfully:", agency);
          
          // Step 3: Update the profile record with the agency ID
          if (agency) {
            try {
              const { error: profileUpdateError } = await supabase
                .from('profiles')
                .update({ 
                  agency_id: agency.id 
                })
                .eq('id', authUser.id);
              
              if (profileUpdateError) throw profileUpdateError;
              
              console.log("Profile updated successfully with agency ID");
              
              // Step 4: Create settings record for the agency with MAD as currency
              try {
                const { error: settingsError } = await supabase
                  .from('settings')
                  .insert({
                    agency_id: agency.id,
                    currency: 'MAD' // Set Moroccan Dirham as the default currency
                  });
                
                if (settingsError) throw settingsError;
                
                console.log("Settings created successfully for the agency with MAD currency");
              } catch (settingsError: any) {
                console.error('Settings creation error:', settingsError);
                throw new Error(settingsError.message || 'حدث خطأ أثناء إنشاء الإعدادات');
              }
            } catch (profileError: any) {
              console.error('Profile update error:', profileError);
              throw new Error(profileError.message || 'حدث خطأ أثناء تحديث الملف الشخصي');
            }
          }
        } catch (agencyError: any) {
          console.error('Agency creation error:', agencyError);
          throw new Error(agencyError.message || 'حدث خطأ أثناء إنشاء الوكالة');
        }
      }
      
      console.log("Registration completed successfully");
      
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
