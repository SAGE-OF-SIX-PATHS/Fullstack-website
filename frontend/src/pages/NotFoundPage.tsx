import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
          return (
                    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                              <div className="max-w-max mx-auto text-center">
                                        <div className="sm:flex items-center justify-center">
                                                  <div className="sm:border-r sm:border-gray-200 sm:pr-6">
                                                            <h1 className="text-7xl font-extrabold text-blue-600 tracking-tight">404</h1>
                                                  </div>
                                                  <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-left">
                                                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Page not found</h1>
                                                            <p className="mt-1 text-base text-gray-500">
                                                                      Sorry, we couldn't find the page you're looking for.
                                                            </p>
                                                  </div>
                                        </div>
                                        <div className="mt-8">
                                                  <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                            <Home className="h-4 w-4 mr-2" />
                                                            Go back home
                                                  </Link>
                                        </div>
                              </div>
                    </div>
          );
};

export default NotFoundPage;