import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../config';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { CreditCard, ShieldCheck, Truck, Lock, Zap, Award } from 'lucide-react';

const CheckoutPage = () => {
          const { cartItems, cartTotal } = useCart();
          const { user } = useAuth();
          const navigate = useNavigate();

          const [email, setEmail] = useState(user?.email || '');
          const [isProcessing, setIsProcessing] = useState(false);

          // Format currency
          const formatCurrency = (amount: number) => {
                    return new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                    }).format(amount);
          };

          const handleSubmit = async (e: FormEvent) => {
                    e.preventDefault();

                    if (cartItems.length === 0) {
                              toast.error('Your cart is empty');
                              return;
                    }

                    setIsProcessing(true);

                    try {
                              // Initialize payment with Paystack
                              const response = await axios.post(`${API_URL}/api/initialize-payment`, {
                                        email,
                                        amount: cartTotal * 100, // Paystack expects amount in kobo (smallest currency unit)
                              });

                              // Redirect to Paystack checkout page
                              window.location.href = response.data.authorizationUrl;
                    } catch (error) {
                              console.error('Payment initialization failed:', error);
                              toast.error('Failed to initialize payment. Please try again.');
                              setIsProcessing(false);
                    }
          };

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
                                                            Secure
                                                            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                                                      Checkout
                                                            </span>
                                                  </h1>
                                                  <p className="text-purple-200 text-lg">Complete your purchase with confidence</p>
                                        </div>

                                        {cartItems.length === 0 ? (
                                                  <div className="text-center py-20 animate-scale-in">
                                                            <div className="card-glass p-12 max-w-md mx-auto">
                                                                      <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
                                                                      <p className="text-purple-200 mb-8">Add some items to your cart before proceeding to checkout.</p>
                                                                      <button
                                                                                onClick={() => navigate('/')}
                                                                                className="btn-primary px-6 py-3"
                                                                      >
                                                                                Continue Shopping
                                                                      </button>
                                                            </div>
                                                  </div>
                                        ) : (
                                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                            {/* Order summary */}
                                                            <div className="lg:col-span-2 animate-slide-in-left">
                                                                      <div className="card-glass p-8">
                                                                                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                                                                          <Award className="h-6 w-6 mr-2 text-purple-400" />
                                                                                          Order Summary
                                                                                </h2>
                                                                                <div className="divide-y divide-white/10">
                                                                                          {cartItems.map((item, index) => (
                                                                                                    <div key={item.product._id} className={`py-6 flex justify-between stagger-animation`} style={{ animationDelay: `${index * 0.1}s` }}>
                                                                                                              <div className="flex items-center">
                                                                                                                        <div className="h-16 w-16 rounded-xl overflow-hidden mr-4 border border-white/20">
                                                                                                                                  <img
                                                                                                                                            src={item.product.image}
                                                                                                                                            alt={item.product.name}
                                                                                                                                            className="h-full w-full object-cover"
                                                                                                                                  />
                                                                                                                        </div>
                                                                                                                        <div>
                                                                                                                                  <h3 className="text-lg font-medium text-white">{item.product.name}</h3>
                                                                                                                                  <p className="text-purple-200">Qty: {item.quantity}</p>
                                                                                                                        </div>
                                                                                                              </div>
                                                                                                              <p className="text-lg font-semibold text-white">
                                                                                                                        {formatCurrency(item.product.price * item.quantity)}
                                                                                                              </p>
                                                                                                    </div>
                                                                                          ))}
                                                                                </div>

                                                                                <div className="mt-8 pt-8 border-t border-white/20">
                                                                                          <div className="space-y-3">
                                                                                                    <div className="flex justify-between text-white">
                                                                                                              <p>Subtotal</p>
                                                                                                              <p className="font-medium">{formatCurrency(cartTotal)}</p>
                                                                                                    </div>
                                                                                                    <div className="flex justify-between text-purple-200">
                                                                                                              <p>Shipping</p>
                                                                                                              <p>Calculated at next step</p>
                                                                                                    </div>
                                                                                                    <div className="flex justify-between text-purple-200">
                                                                                                              <p>Taxes</p>
                                                                                                              <p>Calculated at next step</p>
                                                                                                    </div>
                                                                                                    <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-white/20">
                                                                                                              <p>Total</p>
                                                                                                              <p className="gradient-text">{formatCurrency(cartTotal)}</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      </div>

                                                                      {/* Security Features */}
                                                                      <div className="mt-8 card-glass p-8">
                                                                                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                                                                          <ShieldCheck className="h-6 w-6 mr-2 text-purple-400" />
                                                                                          Security & Delivery
                                                                                </h2>
                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                                          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 stagger-animation">
                                                                                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4">
                                                                                                              <Lock className="h-6 w-6 text-white" />
                                                                                                    </div>
                                                                                                    <h3 className="text-lg font-medium text-white mb-2">Secure Payment</h3>
                                                                                                    <p className="text-purple-200 text-sm">256-bit SSL encryption</p>
                                                                                          </div>
                                                                                          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 stagger-animation">
                                                                                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4">
                                                                                                              <Zap className="h-6 w-6 text-white" />
                                                                                                    </div>
                                                                                                    <h3 className="text-lg font-medium text-white mb-2">Fast Processing</h3>
                                                                                                    <p className="text-purple-200 text-sm">Instant confirmation</p>
                                                                                          </div>
                                                                                          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 stagger-animation">
                                                                                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4">
                                                                                                              <Truck className="h-6 w-6 text-white" />
                                                                                                    </div>
                                                                                                    <h3 className="text-lg font-medium text-white mb-2">Fast Delivery</h3>
                                                                                                    <p className="text-purple-200 text-sm">3-5 business days</p>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* Payment section */}
                                                            <div className="lg:col-span-1 animate-slide-in-right">
                                                                      <div className="card-glass p-8 sticky top-8">
                                                                                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                                                                          <CreditCard className="h-6 w-6 mr-2 text-purple-400" />
                                                                                          Payment
                                                                                </h2>
                                                                                <form onSubmit={handleSubmit} className="space-y-6">
                                                                                          <div>
                                                                                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                                                                                              Email address
                                                                                                    </label>
                                                                                                    <input
                                                                                                              type="email"
                                                                                                              id="email"
                                                                                                              name="email"
                                                                                                              value={email}
                                                                                                              onChange={(e) => setEmail(e.target.value)}
                                                                                                              required
                                                                                                              className="input-glass"
                                                                                                              placeholder="you@example.com"
                                                                                                    />
                                                                                                    <p className="mt-2 text-sm text-purple-200">
                                                                                                              We'll send your receipt to this email
                                                                                                    </p>
                                                                                          </div>

                                                                                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                                                                                    <div className="flex items-center text-purple-200 text-sm">
                                                                                                              <ShieldCheck className="h-4 w-4 mr-2 text-green-400" />
                                                                                                              Powered by Paystack - Bank-level security
                                                                                                    </div>
                                                                                          </div>

                                                                                          <button
                                                                                                    type="submit"
                                                                                                    disabled={isProcessing}
                                                                                                    className="w-full btn-primary px-8 py-4 text-lg font-semibold hover-glow disabled:opacity-70 disabled:cursor-not-allowed"
                                                                                          >
                                                                                                    {isProcessing ? (
                                                                                                              <div className="flex items-center justify-center">
                                                                                                                        <LoadingSpinner size="small" color="text-white" />
                                                                                                                        <span className="ml-3">Processing...</span>
                                                                                                              </div>
                                                                                                    ) : (
                                                                                                              <div className="flex items-center justify-center">
                                                                                                                        <Lock className="h-5 w-5 mr-2" />
                                                                                                                        Pay {formatCurrency(cartTotal)}
                                                                                                              </div>
                                                                                                    )}
                                                                                          </button>

                                                                                          <div className="text-center">
                                                                                                    <p className="text-xs text-purple-200 leading-relaxed">
                                                                                                              By completing your purchase, you agree to our{' '}
                                                                                                              <a href="#" className="text-white hover:text-purple-300 transition-colors">
                                                                                                                        Terms of Service
                                                                                                              </a>{' '}
                                                                                                              and{' '}
                                                                                                              <a href="#" className="text-white hover:text-purple-300 transition-colors">
                                                                                                                        Privacy Policy
                                                                                                              </a>
                                                                                                              .
                                                                                                    </p>
                                                                                          </div>
                                                                                </form>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )}
                              </div>
                    </div>
          );
};

export default CheckoutPage;