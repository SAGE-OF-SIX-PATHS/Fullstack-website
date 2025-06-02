import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/ui/LoadingSpinner';

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
                              navigate('/');
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

          return (
                    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                              <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                                        <div className="text-center">
                                                  <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                                                  <p className="mt-2 text-sm text-gray-600">
                                                            Already have an account?{' '}
                                                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                                                      Sign in
                                                            </Link>
                                                  </p>
                                        </div>

                                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                                  <div className="rounded-md space-y-4">
                                                            <div>
                                                                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                                                Full Name
                                                                      </label>
                                                                      <div className="mt-1">
                                                                                <input
                                                                                          id="name"
                                                                                          name="name"
                                                                                          type="text"
                                                                                          required
                                                                                          value={name}
                                                                                          onChange={(e) => setName(e.target.value)}
                                                                                          className="input"
                                                                                          placeholder="John Doe"
                                                                                />
                                                                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                                                      </div>
                                                            </div>

                                                            <div>
                                                                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                                                Email address
                                                                      </label>
                                                                      <div className="mt-1">
                                                                                <input
                                                                                          id="email"
                                                                                          name="email"
                                                                                          type="email"
                                                                                          autoComplete="email"
                                                                                          required
                                                                                          value={email}
                                                                                          onChange={(e) => setEmail(e.target.value)}
                                                                                          className="input"
                                                                                          placeholder="you@example.com"
                                                                                />
                                                                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                                                      </div>
                                                            </div>

                                                            <div>
                                                                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                                                Password
                                                                      </label>
                                                                      <div className="mt-1 relative rounded-md shadow-sm">
                                                                                <input
                                                                                          id="password"
                                                                                          name="password"
                                                                                          type={showPassword ? 'text' : 'password'}
                                                                                          autoComplete="new-password"
                                                                                          required
                                                                                          value={password}
                                                                                          onChange={(e) => setPassword(e.target.value)}
                                                                                          className="input pr-10"
                                                                                />
                                                                                <button
                                                                                          type="button"
                                                                                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                                                          onClick={() => setShowPassword(!showPassword)}
                                                                                >
                                                                                          {showPassword ? (
                                                                                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                                                                          ) : (
                                                                                                    <Eye className="h-5 w-5 text-gray-400" />
                                                                                          )}
                                                                                </button>
                                                                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                                                      </div>
                                                            </div>

                                                            <div>
                                                                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                                                                Confirm Password
                                                                      </label>
                                                                      <div className="mt-1">
                                                                                <input
                                                                                          id="confirm-password"
                                                                                          name="confirm-password"
                                                                                          type={showPassword ? 'text' : 'password'}
                                                                                          autoComplete="new-password"
                                                                                          required
                                                                                          value={confirmPassword}
                                                                                          onChange={(e) => setConfirmPassword(e.target.value)}
                                                                                          className="input"
                                                                                />
                                                                                {errors.confirmPassword && (
                                                                                          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                                                                )}
                                                                      </div>
                                                            </div>
                                                  </div>

                                                  <div>
                                                            <button
                                                                      type="submit"
                                                                      disabled={isLoading}
                                                                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                                                            >
                                                                      {isLoading ? (
                                                                                <LoadingSpinner size="small" color="text-white" />
                                                                      ) : (
                                                                                <>
                                                                                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                                                                    <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                                                                                          </span>
                                                                                          Create Account
                                                                                </>
                                                                      )}
                                                            </button>
                                                  </div>
                                        </form>
                              </div>
                    </div>
          );
};

export default SignupPage;