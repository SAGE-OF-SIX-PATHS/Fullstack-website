import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

interface CartItemProps {
          item: {
                    product: {
                              _id: string;
                              name: string;
                              price: number;
                              image: string;
                    };
                    quantity: number;
          };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
          const { updateCartItemQuantity, removeFromCart } = useCart();
          const [isUpdating, setIsUpdating] = useState(false);

          const handleQuantityChange = async (newQuantity: number) => {
                    if (newQuantity < 1) return;

                    setIsUpdating(true);
                    try {
                              await updateCartItemQuantity(item.product._id, newQuantity);
                    } finally {
                              setIsUpdating(false);
                    }
          };

          const handleRemove = async () => {
                    setIsUpdating(true);
                    try {
                              await removeFromCart(item.product._id);
                    } finally {
                              setIsUpdating(false);
                    }
          };

          // Format price to local currency
          const formattedPrice = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
          }).format(item.product.price);

          const subtotal = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
          }).format(item.product.price * item.quantity);

          return (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-200">
                              <div className="flex items-center mb-4 sm:mb-0">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                  <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="h-full w-full object-cover object-center"
                                                  />
                                        </div>
                                        <div className="ml-4">
                                                  <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
                                                  <p className="mt-1 text-sm text-gray-500">{formattedPrice} each</p>
                                        </div>
                              </div>

                              <div className="flex items-center justify-between w-full sm:w-auto">
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                                  <button
                                                            type="button"
                                                            disabled={isUpdating || item.quantity <= 1}
                                                            onClick={() => handleQuantityChange(item.quantity - 1)}
                                                            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                                                            aria-label="Decrease quantity"
                                                  >
                                                            <Minus className="h-4 w-4" />
                                                  </button>
                                                  <span className="px-4 py-1 text-gray-900">{item.quantity}</span>
                                                  <button
                                                            type="button"
                                                            disabled={isUpdating}
                                                            onClick={() => handleQuantityChange(item.quantity + 1)}
                                                            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                                                            aria-label="Increase quantity"
                                                  >
                                                            <Plus className="h-4 w-4" />
                                                  </button>
                                        </div>

                                        <div className="flex items-center ml-6">
                                                  <p className="text-base font-medium text-gray-900 mr-4">{subtotal}</p>
                                                  <button
                                                            type="button"
                                                            onClick={handleRemove}
                                                            disabled={isUpdating}
                                                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                                            aria-label="Remove item"
                                                  >
                                                            <Trash2 className="h-5 w-5" />
                                                  </button>
                                        </div>
                              </div>
                    </div>
          );
};

export default CartItem;