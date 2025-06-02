import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
          const { cartItems, loading, cartTotal } = useCart();

          // Format cart total
          const formattedCartTotal = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
          }).format(cartTotal);

          if (loading) {
                    return (
                              <div className="flex justify-center items-center min-h-[60vh]">
                                        <LoadingSpinner size="large" />
                              </div>
                    );
          }

          return (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                              <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

                              {cartItems.length === 0 ? (
                                        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                                                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                                                            <ShoppingBag className="h-8 w-8 text-blue-500" />
                                                  </div>
                                                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                                                  <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
                                                  <Link
                                                            to="/"
                                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                  >
                                                            Start Shopping
                                                  </Link>
                                        </div>
                              ) : (
                                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                                  <div className="divide-y divide-gray-200">
                                                            {/* Cart items list */}
                                                            <div className="px-4 py-6 sm:px-6">
                                                                      <div className="flow-root">
                                                                                <ul className="divide-y divide-gray-200">
                                                                                          {cartItems.map((item) => (
                                                                                                    <li key={item.product._id} className="py-4">
                                                                                                              <CartItem item={item} />
                                                                                                    </li>
                                                                                          ))}
                                                                                </ul>
                                                                      </div>
                                                            </div>

                                                            {/* Cart summary */}
                                                            <div className="px-4 py-6 sm:px-6">
                                                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <p>Subtotal</p>
                                                                                <p>{formattedCartTotal}</p>
                                                                      </div>
                                                                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                                      <div className="mt-6">
                                                                                <Link
                                                                                          to="/checkout"
                                                                                          className="flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                                >
                                                                                          Proceed to Checkout
                                                                                          <ArrowRight className="ml-2 h-5 w-5" />
                                                                                </Link>
                                                                      </div>
                                                                      <div className="mt-4 flex justify-center text-sm text-gray-500">
                                                                                <p>
                                                                                          or{' '}
                                                                                          <Link to="/" className="text-blue-600 hover:text-blue-500">
                                                                                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                                                                          </Link>
                                                                                </p>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                              )}
                    </div>
          );
};

export default CartPage;