// components/Navbar.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Menu, X, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
          const { isAuthenticated, user, logout } = useAuth();
          const { cartItems } = useCart();
          const [isMenuOpen, setIsMenuOpen] = useState(false);
          const navigate = useNavigate();

          const handleLogout = () => {
                    logout();
                    navigate('/');
          };

          const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
          const firstName = user?.name?.split(' ')[0];

          return (
                    <nav className="bg-white shadow-md sticky top-0 z-50">
                              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                        <div className="flex justify-between h-16">
                                                  <div className="flex items-center">
                                                            <Link to="/" className="flex items-center">
                                                                      <ShoppingBag className="h-8 w-8 text-blue-500" />
                                                                      <span className="ml-2 text-xl font-bold text-gray-800">Shop~hera</span>
                                                            </Link>
                                                  </div>

                                                  <div className="hidden md:flex md:items-center md:space-x-8">
                                                            <Link to="/" className="text-gray-700 hover:text-blue-500 text-sm font-medium">Home</Link>

                                                            {isAuthenticated ? (
                                                                      <>
                                                                                <Link to="/cart" className="relative text-gray-700 hover:text-blue-500">
                                                                                          <ShoppingCart className="h-5 w-5 inline" />
                                                                                          <span className="ml-1">Cart</span>
                                                                                          {cartItemCount > 0 && (
                                                                                                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1.5">
                                                                                                              {cartItemCount}
                                                                                                    </span>
                                                                                          )}
                                                                                </Link>
                                                                                <div className="flex items-center space-x-3">
                                                                                          <img src="https://via.placeholder.com/32" className="h-8 w-8 rounded-full border" />
                                                                                          <span className="text-sm text-gray-700">Hi, {firstName}</span>
                                                                                          <button onClick={handleLogout} className="hover:text-red-500">
                                                                                                    <LogOut className="h-5 w-5" />
                                                                                          </button>
                                                                                </div>
                                                                      </>
                                                            ) : (
                                                                      <>
                                                                                <Link to="/login" className="text-sm text-gray-700 hover:text-blue-500">Login</Link>
                                                                                <Link to="/signup" className="text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">Sign Up</Link>
                                                                      </>
                                                            )}
                                                  </div>

                                                  <div className="md:hidden flex items-center">
                                                            {isAuthenticated && (
                                                                      <Link to="/cart" className="text-gray-700 relative mr-4">
                                                                                <ShoppingCart className="h-6 w-6" />
                                                                                {cartItemCount > 0 && (
                                                                                          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                                                                    {cartItemCount}
                                                                                          </span>
                                                                                )}
                                                                      </Link>
                                                            )}
                                                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                                                                      {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                                            </button>
                                                  </div>
                                        </div>
                              </div>

                              {isMenuOpen && (
                                        <div className="md:hidden px-4 py-2 bg-white shadow-md space-y-2">
                                                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-gray-700">Home</Link>
                                                  {isAuthenticated ? (
                                                            <>
                                                                      <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block text-gray-700">Cart</Link>
                                                                      <div className="flex items-center space-x-2">
                                                                                <img src="https://via.placeholder.com/32" className="h-8 w-8 rounded-full" />
                                                                                <span className="text-sm text-gray-700">Hi, {firstName}</span>
                                                                                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="hover:text-red-500">
                                                                                          <LogOut className="h-5 w-5" />
                                                                                </button>
                                                                      </div>
                                                            </>
                                                  ) : (
                                                            <>
                                                                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-gray-700">Login</Link>
                                                                      <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block text-gray-700">Sign Up</Link>
                                                            </>
                                                  )}
                                        </div>
                              )}
                    </nav>
          );
};

export default Navbar;
