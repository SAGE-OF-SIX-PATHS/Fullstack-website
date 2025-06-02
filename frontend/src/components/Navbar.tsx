import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
          const { isAuthenticated, user, logout } = useAuth();
          const { cartItems } = useCart();
          const navigate = useNavigate();
          const [isMenuOpen, setIsMenuOpen] = useState(false);

          const handleLogout = () => {
                    logout();
                    navigate('/login');
          };

          const toggleMenu = () => {
                    setIsMenuOpen(!isMenuOpen);
          };

          const cartItemCount = cartItems.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);


          return (
                    <nav className="bg-white shadow-md sticky top-0 z-50">
                              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                        <div className="flex justify-between h-16">
                                                  <div className="flex items-center">
                                                            <Link to="/" className="flex-shrink-0 flex items-center">
                                                                      <ShoppingBag className="h-8 w-8 text-blue-500" />
                                                                      <span className="ml-2 text-xl font-bold text-gray-800">Shop~hera</span>
                                                            </Link>
                                                  </div>

                                                  {/* Desktop menu */}
                                                  <div className="hidden md:flex md:items-center md:space-x-8">
                                                            <Link to="/" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                                                      Home
                                                            </Link>

                                                            {isAuthenticated ? (
                                                                      <>
                                                                                <Link to="/cart" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors relative">
                                                                                          <ShoppingCart className="h-5 w-5 inline-block" />
                                                                                          <span className="ml-1">Cart</span>
                                                                                          {cartItemCount > 0 && (
                                                                                                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                                                                              {cartItemCount}
                                                                                                    </span>
                                                                                          )}
                                                                                </Link>
                                                                                <div className="flex items-center space-x-2">
                                                                                          <span className="text-sm font-medium text-gray-700">
                                                                                                    <User className="h-4 w-4 inline mr-1" />
                                                                                                    {user?.name}
                                                                                          </span>
                                                                                          <button
                                                                                                    onClick={handleLogout}
                                                                                                    className="text-gray-700 hover:text-red-500 transition-colors"
                                                                                                    aria-label="Logout"
                                                                                          >
                                                                                                    <LogOut className="h-5 w-5" />
                                                                                          </button>
                                                                                </div>
                                                                      </>
                                                            ) : (
                                                                      <div className="flex space-x-4">
                                                                                <Link to="/login" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                                                                          Login
                                                                                </Link>
                                                                                <Link to="/signup" className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                                                                          Sign Up
                                                                                </Link>
                                                                      </div>
                                                            )}
                                                  </div>

                                                  {/* Mobile menu button */}
                                                  <div className="md:hidden flex items-center">
                                                            {isAuthenticated && (
                                                                      <Link to="/cart" className="text-gray-700 mr-4 relative">
                                                                                <ShoppingCart className="h-6 w-6" />
                                                                                {cartItemCount > 0 && (
                                                                                          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                                                                    {cartItemCount}
                                                                                          </span>
                                                                                )}
                                                                      </Link>
                                                            )}
                                                            <button
                                                                      onClick={toggleMenu}
                                                                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none"
                                                                      aria-expanded={isMenuOpen}
                                                            >
                                                                      <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                                                                      {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                                            </button>
                                                  </div>
                                        </div>
                              </div>

                              {/* Mobile menu */}
                              {isMenuOpen && (
                                        <div className="md:hidden animate-fade-in">
                                                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                                                            <Link
                                                                      to="/"
                                                                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                                                                      onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                      Home
                                                            </Link>

                                                            {isAuthenticated ? (
                                                                      <>
                                                                                <Link
                                                                                          to="/cart"
                                                                                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                                                                                          onClick={() => setIsMenuOpen(false)}
                                                                                >
                                                                                          Cart
                                                                                </Link>
                                                                                <div className="px-3 py-2 flex justify-between items-center">
                                                                                          <span className="text-sm font-medium text-gray-700">
                                                                                                    <User className="h-4 w-4 inline mr-1" />
                                                                                                    {user?.name}
                                                                                          </span>
                                                                                          <button
                                                                                                    onClick={() => {
                                                                                                              handleLogout();
                                                                                                              setIsMenuOpen(false);
                                                                                                    }}
                                                                                                    className="text-gray-700 hover:text-red-500 transition-colors"
                                                                                                    aria-label="Logout"
                                                                                          >
                                                                                                    <LogOut className="h-5 w-5" />
                                                                                          </button>
                                                                                </div>
                                                                      </>
                                                            ) : (
                                                                      <>
                                                                                <Link
                                                                                          to="/login"
                                                                                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                                                                                          onClick={() => setIsMenuOpen(false)}
                                                                                >
                                                                                          Login
                                                                                </Link>
                                                                                <Link
                                                                                          to="/signup"
                                                                                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                                                                                          onClick={() => setIsMenuOpen(false)}
                                                                                >
                                                                                          Sign Up
                                                                                </Link>
                                                                      </>
                                                            )}
                                                  </div>
                                        </div>
                              )}
                    </nav>
          );
};

export default Navbar;