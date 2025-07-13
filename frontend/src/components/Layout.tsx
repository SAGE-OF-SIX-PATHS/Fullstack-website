import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Layout = () => {
          const { isAuthenticated } = useAuth();
          const { fetchCart } = useCart();
          const location = useLocation();

          // Fetch cart when authenticated
          useEffect(() => {
                    if (isAuthenticated) {
                              fetchCart();
                    }
          }, [isAuthenticated, fetchCart]);

          // Hide Navbar & Footer on dashboard pages
          const isDashboardRoute = location.pathname.startsWith('/dashboard');

          return (
                    <div className="flex flex-col min-h-screen">
                              {!isDashboardRoute && <Navbar />}
                              <main className="flex-grow">
                                        <Outlet />
                              </main>
                              {!isDashboardRoute && <Footer />}
                    </div>
          );
};

export default Layout;
