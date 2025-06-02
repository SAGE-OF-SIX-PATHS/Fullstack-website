import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../config';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { CreditCard, ShieldCheck, Truck } from 'lucide-react';

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
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                              <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                              {cartItems.length === 0 ? (
                                        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                                                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                                                  <p className="text-gray-500 mb-6">Add some items to your cart before proceeding to checkout.</p>
                                                  <button
                                                            onClick={() => navigate('/')}
                                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                  >
                                                            Continue Shopping
                                                  </button>
                                        </div>
                              ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                  {/* Order summary */}
                                                  <div className="lg:col-span-2">
                                                            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                                                                      <div className="p-6">
                                                                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                                                                                <div className="divide-y divide-gray-200">
                                                                                          {cartItems.map((item) => (
                                                                                                    <div key={item.product._id} className="py-4 flex justify-between">
                                                                                                              <div className="flex items-center">
                                                                                                                        <img
                                                                                                                                  src={item.product.image}
                                                                                                                                  alt={item.product.name}
                                                                                                                                  className="h-16 w-16 rounded-md object-cover mr-4"
                                                                                                                        />
                                                                                                                        <div>
                                                                                                                                  <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
                                                                                                                                  <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                                                                                                                        </div>
                                                                                                              </div>
                                                                                                              <p className="text-base font-medium text-gray-900">
                                                                                                                        {formatCurrency(item.product.price * item.quantity)}
                                                                                                              </p>
                                                                                                    </div>
                                                                                          ))}
                                                                                </div>

                                                                                <div className="mt-6 border-t border-gray-200 pt-6">
                                                                                          <div className="flex justify-between">
                                                                                                    <p className="text-base font-medium text-gray-900">Subtotal</p>
                                                                                                    <p className="text-base font-medium text-gray-900">{formatCurrency(cartTotal)}</p>
                                                                                          </div>
                                                                                          <div className="flex justify-between mt-2">
                                                                                                    <p className="text-sm text-gray-500">Shipping</p>
                                                                                                    <p className="text-sm text-gray-500">Calculated at next step</p>
                                                                                          </div>
                                                                                          <div className="flex justify-between mt-2">
                                                                                                    <p className="text-sm text-gray-500">Taxes</p>
                                                                                                    <p className="text-sm text-gray-500">Calculated at next step</p>
                                                                                          </div>
                                                                                          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                                                                                                    <p className="text-lg font-semibold text-gray-900">Total</p>
                                                                                                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(cartTotal)}</p>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* Additional information */}
                                                            <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
                                                                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping & Payment Information</h2>
                                                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                                <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                                                                                          <ShieldCheck className="h-8 w-8 text-blue-500 mb-2" />
                                                                                          <h3 className="text-base font-medium text-gray-900">Secure Payment</h3>
                                                                                          <p className="text-sm text-gray-500 text-center mt-1">Your payment information is encrypted</p>
                                                                                </div>
                                                                                <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                                                                                          <Truck className="h-8 w-8 text-blue-500 mb-2" />
                                                                                          <h3 className="text-base font-medium text-gray-900">Fast Delivery</h3>
                                                                                          <p className="text-sm text-gray-500 text-center mt-1">Delivery within 3-5 business days</p>
                                                                                </div>
                                                                                <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                                                                                          <CreditCard className="h-8 w-8 text-blue-500 mb-2" />
                                                                                          <h3 className="text-base font-medium text-gray-900">Multiple Payment Options</h3>
                                                                                          <p className="text-sm text-gray-500 text-center mt-1">Card, bank transfer, etc.</p>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>

                                                  {/* Payment section */}
                                                  <div className="lg:col-span-1">
                                                            <div className="bg-white shadow-sm rounded-lg p-6">
                                                                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment</h2>
                                                                      <form onSubmit={handleSubmit}>
                                                                                <div className="mb-4">
                                                                                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                                                                    Email address
                                                                                          </label>
                                                                                          <input
                                                                                                    type="email"
                                                                                                    id="email"
                                                                                                    name="email"
                                                                                                    value={email}
                                                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                                                    required
                                                                                                    className="input"
                                                                                                    placeholder="you@example.com"
                                                                                          />
                                                                                          <p className="mt-1 text-sm text-gray-500">
                                                                                                    We'll send your receipt to this email
                                                                                          </p>
                                                                                </div>

                                                                                <div className="mt-6">
                                                                                          <button
                                                                                                    type="submit"
                                                                                                    disabled={isProcessing}
                                                                                                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                                                                                          >
                                                                                                    {isProcessing ? (
                                                                                                              <>
                                                                                                                        <LoadingSpinner size="small" color="text-white" />
                                                                                                                        <span className="ml-2">Processing...</span>
                                                                                                              </>
                                                                                                    ) : (
                                                                                                              <>Pay {formatCurrency(cartTotal)}</>
                                                                                                    )}
                                                                                          </button>
                                                                                </div>

                                                                                <div className="mt-4">
                                                                                          <p className="text-xs text-gray-500 text-center">
                                                                                                    By completing your purchase, you agree to our{' '}
                                                                                                    <a href="#" className="text-blue-600 hover:text-blue-500">
                                                                                                              Terms of Service
                                                                                                    </a>{' '}
                                                                                                    and{' '}
                                                                                                    <a href="#" className="text-blue-600 hover:text-blue-500">
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
          );
};

export default CheckoutPage;