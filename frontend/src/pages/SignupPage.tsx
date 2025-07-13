import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, UserPlus, ShoppingBag, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Outlet, useLocation } from 'react-router-dom';

const SignupPage = () => {
          const [name, setName] = useState('');
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [confirmPassword, setConfirmPassword] = useState('');
          const [showPassword, setShowPassword] = useState(false);
          const [isLoading, setIsLoading] = useState(false);
          const [errors, setErrors] = useState<{
                    name?: string;
                    email?: string;
                    password?: string;
                    confirmPassword?: string;
          
          }>({});

          

          const { register } = useAuth();
          const navigate = useNavigate();
          const location = useLocation();
          const from = location.state?.from?.pathname || '/signup';

          const validateForm = () => {
                    const newErrors: {
                              name?: string;
                              email?: string;
                              password?: string;
                              confirmPassword?: string;
                    } = {};

                    // Validate name
                    if (!name.trim()) {
                              newErrors.name = 'Name is required';
                    }

                    // Validate email
                    if (!email.trim()) {
                              newErrors.email = 'Email is required';
                    } else if (!/\S+@\S+\.\S+/.test(email)) {
                              newErrors.email = 'Email is invalid';
                    }

                    // Validate password
                    if (!password) {
                              newErrors.password = 'Password is required';
                    } else if (password.length < 6) {
                              newErrors.password = 'Password must be at least 6 characters';
                    }

                    // Validate confirm password
                    if (password !== confirmPassword) {
                              newErrors.confirmPassword = 'Passwords do not match';
                    }

                    setErrors(newErrors);
                    return Object.keys(newErrors).length === 0;
          };

          const handleSubmit = async (e: FormEvent) => {
                    e.preventDefault();

                    if (!validateForm()) {
                              return;
                    }

                    setIsLoading(true);

                    try {
                              await register(name, email, password);
                              toast.success('Account created successfully!');
                              navigate('/login');
                    } catch (error: any) {
                              if (error.response?.data?.message) {
                                        toast.error(error.response.data.message);
                              } else {
                                        toast.error('Failed to create account. Please try again.');
                              }
                    } finally {
                              setIsLoading(false);
                    }
          };

          const passwordRequirements = [
                    { text: 'At least 6 characters', met: password.length >= 6 },
                    { text: 'Contains letters', met: /[a-zA-Z]/.test(password) },
                    { text: 'Passwords match', met: password === confirmPassword && password.length > 0 },
          ];

          return (
                    <div className="min-h-screen relative overflow-hidden">
                              {/* Background Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>

                              {/* Animated Background Elements */}
                              <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                                        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                                        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
                              </div>

                              <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                                        <div className="max-w-md w-full">
                                                  {/* Logo and Brand */}
                                                  <div className="text-center mb-8">
                                                            <Link to="/" className="inline-flex items-center justify-center">
                                                                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4">
                                                                                <ShoppingBag className="h-8 w-8 text-white" />
                                                                      </div>
                                                            </Link>
                                                            <h1 className="text-3xl font-bold text-white mb-2">Join Shop~hera</h1>
                                                            <p className="text-purple-200">Create your account and start shopping</p>
                                                  </div>

                                                  {/* Signup Form */}
                                                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                                                            <form className="space-y-6" onSubmit={handleSubmit}>
                                                                      <div>
                                                                                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                                                                          Full Name
                                                                                </label>
                                                                                <input
                                                                                          id="name"
                                                                                          name="name"
                                                                                          type="text"
                                                                                          required
                                                                                          value={name}
                                                                                          onChange={(e) => setName(e.target.value)}
                                                                                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                                                                                          placeholder="John Doe"
                                                                                />
                                                                                {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name}</p>}
                                                                      </div>

                                                                      <div>
                                                                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                                                                          Email address
                                                                                </label>
                                                                                <input
                                                                                          id="email"
                                                                                          name="email"
                                                                                          type="email"
                                                                                          autoComplete="email"
                                                                                          required
                                                                                          value={email}
                                                                                          onChange={(e) => setEmail(e.target.value)}
                                                                                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                                                                                          placeholder="you@example.com"
                                                                                />
                                                                                {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
                                                                      </div>

                                                                      <div>
                                                                                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                                                                          Password
                                                                                </label>
                                                                                <div className="relative">
                                                                                          <input
                                                                                                    id="password"
                                                                                                    name="password"
                                                                                                    type={showPassword ? 'text' : 'password'}
                                                                                                    autoComplete="new-password"
                                                                                                    required
                                                                                                    value={password}
                                                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                                                    className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                                                                                                    placeholder="Create a strong password"
                                                                                          />
                                                                                          <button
                                                                                                    type="button"
                                                                                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                                          >
                                                                                                    {showPassword ? (
                                                                                                              <EyeOff className="h-5 w-5 text-purple-300 hover:text-white transition-colors" />
                                                                                                    ) : (
                                                                                                              <Eye className="h-5 w-5 text-purple-300 hover:text-white transition-colors" />
                                                                                                    )}
                                                                                          </button>
                                                                                </div>
                                                                                {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password}</p>}
                                                                      </div>

                                                                      <div>
                                                                                <label htmlFor="confirm-password" className="block text-sm font-medium text-white mb-2">
                                                                                          Confirm Password
                                                                                </label>
                                                                                <input
                                                                                          id="confirm-password"
                                                                                          name="confirm-password"
                                                                                          type={showPassword ? 'text' : 'password'}
                                                                                          autoComplete="new-password"
                                                                                          required
                                                                                          value={confirmPassword}
                                                                                          onChange={(e) => setConfirmPassword(e.target.value)}
                                                                                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                                                                                          placeholder="Confirm your password"
                                                                                />
                                                                                {errors.confirmPassword && (
                                                                                          <p className="mt-1 text-sm text-red-300">{errors.confirmPassword}</p>
                                                                                )}
                                                                      </div>

                                                                      {/* Password Requirements */}
                                                                      {password && (
                                                                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                                                                          <p className="text-sm text-purple-200 mb-2">Password requirements:</p>
                                                                                          <div className="space-y-1">
                                                                                                    {passwordRequirements.map((req, index) => (
                                                                                                              <div key={index} className="flex items-center text-sm">
                                                                                                                        <Check
                                                                                                                                  className={`h-4 w-4 mr-2 ${req.met ? 'text-green-400' : 'text-purple-300'
                                                                                                                                            }`}
                                                                                                                        />
                                                                                                                        <span className={req.met ? 'text-green-300' : 'text-purple-200'}>
                                                                                                                                  {req.text}
                                                                                                                        </span>
                                                                                                              </div>
                                                                                                    ))}
                                                                                          </div>
                                                                                </div>
                                                                      )}

                                                                      <button
                                                                                type="submit"
                                                                                disabled={isLoading}
                                                                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 transform hover:scale-105 transition-all duration-300 shadow-xl"
                                                                      >
                                                                                {isLoading ? (
                                                                                          <LoadingSpinner size="small" color="text-white" />
                                                                                ) : (
                                                                                          <>
                                                                                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                                                                              <UserPlus className="h-5 w-5 text-purple-300 group-hover:text-purple-200" />
                                                                                                    </span>
                                                                                                    Create your account
                                                                                          </>
                                                                                )}
                                                                      </button>
                                                            </form>

                                                            <div className="mt-6 text-center">
                                                                      <p className="text-purple-200">
                                                                                Already have an account?{' '}
                                                                                <Link
                                                                                          to="/login"
                                                                                          className="font-medium text-white hover:text-purple-300 transition-colors"
                                                                                >
                                                                                          Sign in here
                                                                                </Link>
                                                                      </p>
                                                            </div>
                                                  </div>

                                                  {/* Additional Info */}
                                                  <div className="mt-8 text-center">
                                                            <p className="text-purple-300 text-sm">
                                                                      By creating an account, you agree to our Terms of Service and Privacy Policy
                                                            </p>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
};

export default SignupPage;