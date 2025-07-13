// ✅ AuthContext.tsx
// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

interface User {
          _id: string;
          name: string;
          email: string;
          displayName?: string;
}

interface AuthContextType {
          user: User | null;
          currentUser: User | null; // Added currentUser to match your Dashboard usage
          isAuthenticated: boolean;
          loading: boolean;
          login: (email: string, password: string) => Promise<void>;
          register: (name: string, email: string, password: string) => Promise<void>;
          logout: () => void;
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
          const [loading, setLoading] = useState(true);
          const isAuthenticated = !!user;

          useEffect(() => {
                    const checkAuthStatus = async () => {
                              const token = localStorage.getItem('token');
                              if (token) {
                                        try {
                                                  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                                                  const response = await axios.get(`${API_URL}/auth/users/me`);
                                                  setUser(response.data);
                                        } catch (error) {
                                                  console.error('Authentication error:', error);
                                                  localStorage.removeItem('token');
                                                  delete axios.defaults.headers.common['Authorization'];
                                        }
                              }
                              setLoading(false);
                    };

                    checkAuthStatus();
          }, []);

          const login = async (email: string, password: string) => {
                    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
                    const { token, user } = response.data;
                    localStorage.setItem('token', token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setUser(user);
          };

          const register = async (name: string, email: string, password: string) => {
                    const response = await axios.post(`${API_URL}/auth/register`, {
                              name,
                              email,
                              password,
                              confirmPassword: password, // Assuming confirmPassword is the same as password
                              displayName: name // Automatically set displayName to full name
                    });
                    const { token, user } = response.data;
                    localStorage.setItem('token', token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setUser(user);
          };

          const logout = () => {
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    setUser(null);
          };

          return (
                    <AuthContext.Provider value={{
                              user,
                              currentUser: user, // Alias user as currentUser for backward compatibility
                              isAuthenticated,
                              loading,
                              login,
                              register,
                              logout
                    }}>
                              {children}
                    </AuthContext.Provider>
          );
};