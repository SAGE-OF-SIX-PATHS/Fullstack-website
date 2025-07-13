import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
          return (
                    <div className="min-h-screen gradient-bg flex items-center justify-center">
                              {/* Animated Background Elements */}
                              <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                                        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                                        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
                              </div>

                              <div className="relative max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                                        <div className="animate-scale-in">
                                                  {/* 404 Number */}
                                                  <div className="mb-8">
                                                            <h1 className="text-8xl md:text-9xl font-extrabold gradient-text tracking-tight animate-bounce-slow">
                                                                      404
                                                            </h1>
                                                  </div>

                                                  {/* Error Message */}
                                                  <div className="card-glass p-12 mb-8">
                                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-6">
                                                                      <Search className="h-8 w-8 text-white" />
                                                            </div>
                                                            <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
                                                            <p className="text-xl text-purple-900 mb-8 leading-relaxed">
                                                                      Oops! The page you're looking for seems to have wandered off into the digital void.
                                                                      Don't worry, even the best explorers sometimes take a wrong turn.
                                                            </p>

                                                            {/* Action Buttons */}
                                                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                                      <Link
                                                                                to="/"
                                                                                className="btn-primary px-8 py-4 text-lg font-semibold hover-glow inline-flex items-center justify-center"
                                                                      >
                                                                                <Home className="h-5 w-5 mr-2" />
                                                                                Go Home
                                                                      </Link>
                                                                      <button
                                                                                onClick={() => window.history.back()}
                                                                                className="btn-secondary px-8 py-4 text-lg font-semibold inline-flex items-center justify-center"
                                                                      >
                                                                                <ArrowLeft className="h-5 w-5 mr-2" />
                                                                                Go Back
                                                                      </button>
                                                            </div>
                                                  </div>

                                                  {/* Additional Help */}
                                                  <div className="text-center">
                                                            <p className="text-purple-300">
                                                                      Need help? <Link to="/" className="text-white hover:text-purple-200 font-medium transition-colors">Contact our support team</Link>
                                                            </p>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
};

export default NotFoundPage;