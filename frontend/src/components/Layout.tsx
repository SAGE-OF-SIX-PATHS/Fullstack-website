import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Layout = () => {
          const { isAuthenticated } = useAuth();
          const { fetchCart } = useCart();

          // Fetch cart data when user is authenticated
          useEffect(() => {
                    if (isAuthenticated) {
                              fetchCart();
                    }
          }, [isAuthenticated, fetchCart]);

          return (
                    <div className="flex flex-col min-h-screen">
                              <Navbar />
                              <main className="flex-grow">
                                        <Outlet />
                              </main>
                              <Footer />
                    </div>
          );
};

export default Layout;