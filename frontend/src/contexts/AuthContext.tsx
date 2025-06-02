import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import axios from 'axios';
import { API_URL } from '../config';

interface User {
          _id: string;
          name: string;
          email: string;
}

interface AuthContextType {
          user: User | null;
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

          // Check if user is already logged in
          useEffect(() => {
                    const checkAuthStatus = async () => {
                              const token = localStorage.getItem('token');

                              if (token) {
                                        try {
                                                  // Configure axios with the token
                                                  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                                                  // Make a request to get user data
                                                  const response = await axios.get(`${API_URL}/api/users/me`);
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
                    try {
                              const response = await axios.post(`${API_URL}/api/login`, { email, password });
                              const { token, user } = response.data;

                              // Save token to localStorage
                              localStorage.setItem('token', token);

                              // Set authorization header for future requests
                              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                              // Update state
                              setUser(user);
                    } catch (error) {
                              console.error('Login error:', error);
                              throw error;
                    }
          };

          const register = async (name: string, email: string, password: string) => {
                    try {
                              const response = await axios.post(`${API_URL}/api/register`, { name, email, password });
                              const { token, user } = response.data;

                              // Save token to localStorage
                              localStorage.setItem('token', token);

                              // Set authorization header for future requests
                              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                              // Update state
                              setUser(user);
                    } catch (error) {
                              console.error('Registration error:', error);
                              throw error;
                    }
          };

          const logout = () => {
                    // Remove token from localStorage
                    localStorage.removeItem('token');

                    // Remove authorization header
                    delete axios.defaults.headers.common['Authorization'];

                    // Update state
                    setUser(null);
          };

          const value = {
                    user,
                    isAuthenticated,
                    loading,
                    login,
                    register,
                    logout
          };

          return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};