import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ProductCardProps {
          product: {
                    _id: string;
                    name: string;
                    price: number;
                    image: string;
                    description: string;
          };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
          const { isAuthenticated } = useAuth();
          const { addToCart, cartItems } = useCart();
          const navigate = useNavigate();
          const [isAdding, setIsAdding] = useState(false);

          const isInCart = cartItems.some((item: { product: { _id: string } }) => item.product._id === product._id);


          const handleAddToCart = async () => {
                    if (!isAuthenticated) {
                              toast.error('Please login to add items to cart');
                              navigate('/login');
                              return;
                    }

                    if (isInCart) {
                              navigate('/cart');
                              return;
                    }

                    setIsAdding(true);
                    try {
                              await addToCart(product._id);
                              toast.success(`${product.name} added to cart`);
                    } catch (error) {
                              toast.error('Failed to add to cart');
                    } finally {
                              setIsAdding(false);
                    }
          };

          // Format price to local currency
          const formattedPrice = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
          }).format(product.price);

          return (
                    <div className="card group">
                              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                                        <img
                                                  src={product.image}
                                                  alt={product.name}
                                                  className="h-48 w-full object-cover object-center group-hover:opacity-90 transition-opacity"
                                        />
                              </div>
                              <div className="p-4">
                                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                        <div className="mt-2 flex justify-between items-center">
                                                  <p className="text-lg font-semibold text-gray-900">{formattedPrice}</p>
                                                  <button
                                                            onClick={handleAddToCart}
                                                            disabled={isAdding}
                                                            className={`btn ${isInCart ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-3 py-2 rounded-md transition-colors`}
                                                  >
                                                            {isAdding ? (
                                                                      <span className="flex items-center">
                                                                                <LoadingSpinner size="small" color="text-white" />
                                                                      </span>
                                                            ) : isInCart ? (
                                                                      <span className="flex items-center">
                                                                                <Check className="h-5 w-5 mr-1" />
                                                                                In Cart
                                                                      </span>
                                                            ) : (
                                                                      <span className="flex items-center">
                                                                                <ShoppingCart className="h-5 w-5 mr-1" />
                                                                                Add to Cart
                                                                      </span>
                                                            )}
                                                  </button>
                                        </div>
                              </div>
                    </div>
          );
};

// Add the missing LoadingSpinner component inline
const LoadingSpinner = ({ size = 'small', color = 'text-white' }) => {
          const sizeClass = size === 'small' ? 'h-4 w-4' : size === 'medium' ? 'h-8 w-8' : 'h-12 w-12';

          return (
                    <svg className={`animate-spin ${sizeClass} ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
          );
};

export default ProductCard;