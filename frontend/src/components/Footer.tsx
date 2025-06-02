import { Link } from 'react-router-dom';
import { FaShoppingBag ,FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
          const currentYear = new Date().getFullYear();

          return (
                    <footer className="bg-gray-800 text-white pt-12 pb-8">
                              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                                  {/* Brand section */}
                                                  <div className="col-span-1 md:col-span-1">
                                                            <Link to="/" className="flex items-center">
                                                                      <FaShoppingBag className="h-8 w-8 text-blue-400" />
                                                                      <span className="ml-2 text-xl font-bold">Shophera</span>
                                                            </Link>
                                                            <p className="mt-2 text-gray-400 text-sm">
                                                                      Your one-stop shop for all your shopping needs. We provide a secure and convenient shopping experience.
                                                            </p>
                                                  </div>

                                                  {/* Quick links */}
                                                  <div className="col-span-1">
                                                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                                            <ul className="space-y-2">
                                                                      <li>
                                                                                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                                                                                          Home
                                                                                </Link>
                                                                      </li>
                                                                      <li>
                                                                                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
                                                                                          Cart
                                                                                </Link>
                                                                      </li>
                                                            </ul>
                                                  </div>

                                                  {/* Account */}
                                                  <div className="col-span-1">
                                                            <h3 className="text-lg font-semibold mb-4">Account</h3>
                                                            <ul className="space-y-2">
                                                                      <li>
                                                                                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                                                                                          Login
                                                                                </Link>
                                                                      </li>
                                                                      <li>
                                                                                <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">
                                                                                          Sign Up
                                                                                </Link>
                                                                      </li>
                                                            </ul>
                                                  </div>

                                                  {/* Connect */}
                                                  <div className="col-span-1">
                                                            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                                                            <div className="flex space-x-4">
                                                                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                                                                <FaGithub className="h-5 w-5" />
                                                                                <span className="sr-only">GitHub</span>
                                                                      </a>
                                                                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                                                                <FaTwitter className="h-5 w-5" />
                                                                                <span className="sr-only">Twitter</span>
                                                                      </a>
                                                                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                                                                <FaLinkedin className="h-5 w-5" />
                                                                                <span className="sr-only">LinkedIn</span>
                                                                      </a>
                                                                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                                                                <FaInstagram className="h-5 w-5" />
                                                                                <span className="sr-only">Instagram</span>
                                                                      </a>
                                                            </div>
                                                  </div>
                                        </div>

                                        <div className="mt-8 pt-8 border-t border-gray-700">
                                                  <p className="text-center text-gray-400 text-sm">
                                                            © {currentYear} Shop~hera. All rights reserved.
                                                  </p>
                                        </div>
                              </div>
                    </footer>
          );
};

export default Footer;