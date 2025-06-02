import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import toast from 'react-hot-toast';

interface Product {
          _id: string;
          name: string;
          price: number;
          image: string;
          description: string;
}

interface CartItem {
          product: Product;
          quantity: number;
}

interface CartContextType {
          cartItems: CartItem[];
          loading: boolean;
          addToCart: (productId: string) => Promise<void>;
          removeFromCart: (productId: string) => Promise<void>;
          updateCartItemQuantity: (productId: string, quantity: number) => Promise<void>;
          clearCart: () => Promise<void>;
          fetchCart: () => Promise<void>;
          cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
          const context = useContext(CartContext);
          if (context === undefined) {
                    throw new Error('useCart must be used within a CartProvider');
          }
          return context;
};

interface CartProviderProps {
          children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
          const [cartItems, setCartItems] = useState<CartItem[]>([]);
          const [loading, setLoading] = useState(false);

          // Calculate cart total
          const cartTotal = cartItems.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
          );

          const fetchCart = async () => {
                    // Skip if no token (not logged in)
                    if (!localStorage.getItem('token')) return;

                    setLoading(true);
                    try {
                              const response = await axios.get(`${API_URL}/api/cart`);
                              setCartItems(response.data);
                    } catch (error) {
                              console.error('Error fetching cart:', error);
                              toast.error('Failed to load your cart');
                    } finally {
                              setLoading(false);
                    }
          };

          const addToCart = async (productId: string) => {
                    setLoading(true);
                    try {
                              const response = await axios.post(`${API_URL}/api/cart`, { productId });
                              setCartItems(response.data);
                    } catch (error) {
                              console.error('Error adding to cart:', error);
                              throw error;
                    } finally {
                              setLoading(false);
                    }
          };

          const removeFromCart = async (productId: string) => {
                    setLoading(true);
                    try {
                              const response = await axios.delete(`${API_URL}/api/cart/${productId}`);
                              setCartItems(response.data);
                              toast.success('Item removed from cart');
                    } catch (error) {
                              console.error('Error removing from cart:', error);
                              toast.error('Failed to remove item');
                    } finally {
                              setLoading(false);
                    }
          };

          const updateCartItemQuantity = async (productId: string, quantity: number) => {
                    setLoading(true);
                    try {
                              const response = await axios.patch(`${API_URL}/api/cart/${productId}`, { quantity });
                              setCartItems(response.data);
                    } catch (error) {
                              console.error('Error updating cart:', error);
                              toast.error('Failed to update quantity');
                    } finally {
                              setLoading(false);
                    }
          };

          const clearCart = async () => {
                    setLoading(true);
                    try {
                              await axios.delete(`${API_URL}/api/cart`);
                              setCartItems([]);
                    } catch (error) {
                              console.error('Error clearing cart:', error);
                              throw error;
                    } finally {
                              setLoading(false);
                    }
          };

          const value = {
                    cartItems,
                    loading,
                    addToCart,
                    removeFromCart,
                    updateCartItemQuantity,
                    clearCart,
                    fetchCart,
                    cartTotal
          };

          return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};