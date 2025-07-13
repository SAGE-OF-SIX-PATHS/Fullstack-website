import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

const CartPage = () => {
          const { cartItems, loading, cartTotal } = useCart();

          // Format cart total
          const formattedCartTotal = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
          }).format(cartTotal);

          if (loading) {
                    return (
                              <div className="min-h-screen gradient-bg flex justify-center items-center">
                                        <div className="text-center">
                                                  <LoadingSpinner size="large" />
                                                  <p className="mt-4 text-white text-lg">Loading your cart...</p>
                                        </div>
                              </div>
                    );
          }

          return (
                    <div className="min-h-screen gradient-bg">
                              {/* Animated Background Elements */}
                              <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                                        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                                        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
                              </div>

                              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                                        <div className="text-center mb-12 animate-slide-up">
                                                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                                            Your Shopping
                                                            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                                                      Cart
                                                            </span>
                                                  </h1>
                                                  <p className="text-purple-200 text-lg">Review your items and proceed to checkout</p>
                                        </div>

                                        {cartItems.length === 0 ? (
                                                  <div className="text-center py-20 animate-scale-in">
                                                            <div className="card-glass p-12 max-w-md mx-auto">
                                                                      <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-6 animate-bounce-slow">
                                                                                <ShoppingBag className="h-10 w-10 text-white" />
                                                                      </div>
                                                                      <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
                                                                      <p className="text-purple-200 mb-8 leading-relaxed">
                                                                                Looks like you haven't added any products to your cart yet.
                                                                                Start exploring our amazing collection!
                                                                      </p>
                                                                      <Link
                                                                                to="/"
                                                                                className="btn-primary inline-flex items-center px-6 py-3 text-lg"
                                                                      >
                                                                                <Sparkles className="h-5 w-5 mr-2" />
                                                                                Start Shopping
                                                                      </Link>
                                                            </div>
                                                  </div>
                                        ) : (
                                                  <div className="animate-slide-up">
                                                            <div className="card-glass overflow-hidden">
                                                                      <div className="divide-y divide-white/10">
                                                                                {/* Cart items list */}
                                                                                <div className="px-6 py-8">
                                                                                          <div className="flow-root">
                                                                                                    <ul className="divide-y divide-white/10">
                                                                                                              {cartItems.map((item, index) => (
                                                                                                                        <li key={item.product._id} className={`py-6 stagger-animation`} style={{ animationDelay: `${index * 0.1}s` }}>
                                                                                                                                  <CartItem item={item} />
                                                                                                                        </li>
                                                                                                              ))}
                                                                                                    </ul>
                                                                                          </div>
                                                                                </div>

                                                                                {/* Cart summary */}
                                                                                <div className="px-6 py-8 bg-white/5">
                                                                                          <div className="space-y-4">
                                                                                                    <div className="flex justify-between text-lg font-medium text-white">
                                                                                                              <p>Subtotal</p>
                                                                                                              <p className="gradient-text text-2xl font-bold">{formattedCartTotal}</p>
                                                                                                    </div>
                                                                                                    <p className="text-purple-200">Shipping and taxes calculated at checkout.</p>

                                                                                                    <div className="pt-6">
                                                                                                              <Link
                                                                                                                        to="/checkout"
                                                                                                                        className="w-full btn-primary flex items-center justify-center px-8 py-4 text-lg font-semibold hover-glow"
                                                                                                              >
                                                                                                                        Proceed to Checkout
                                                                                                                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                                                                                              </Link>
                                                                                                    </div>

                                                                                                    <div className="text-center">
                                                                                                              <p className="text-purple-200">
                                                                                                                        or{' '}
                                                                                                                        <Link to="/" className="text-white hover:text-purple-300 font-medium transition-colors">
                                                                                                                                  Continue Shopping<span aria-hidden="true"> →</span>
                                                                                                                        </Link>
                                                                                                              </p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )}
                              </div>
                    </div>
          );
};

export default CartPage;