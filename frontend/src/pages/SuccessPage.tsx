import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { API_URL } from '../config';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { CheckCircle, Calendar, Truck, ArrowRight, Sparkles, Gift, Star } from 'lucide-react';
import confetti from '../utils/confetti';

interface PaymentDetails {
          reference: string;
          amount: number;
          createdAt: string;
          status: string;
}

const SuccessPage = () => {
          const [searchParams] = useSearchParams();
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState<string | null>(null);
          const [payment, setPayment] = useState<PaymentDetails | null>(null);
          const { clearCart } = useCart();

          // Get reference from URL
          const reference = searchParams.get('reference');

          useEffect(() => {
                    if (!reference) {
                              setError('No payment reference found');
                              setLoading(false);
                              return;
                    }

                    const verifyPayment = async () => {
                              try {
                                        const response = await axios.get(`${API_URL}/api/verify-payment/${reference}`);
                                        setPayment(response.data);

                                        // Clear the cart after successful payment
                                        await clearCart();

                                        // Trigger confetti animation
                                        confetti();
                              } catch (err) {
                                        console.error('Error verifying payment:', err);
                                        setError('Failed to verify your payment. Please contact support.');
                              } finally {
                                        setLoading(false);
                              }
                    };

                    verifyPayment();
          }, [reference, clearCart]);

          // Format date
          const formatDate = (dateString: string) => {
                    return new Date(dateString).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                    });
          };

          // Format amount
          const formatAmount = (amount: number) => {
                    return new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                    }).format(amount / 100); // Convert from cents to dollars
          };

          if (loading) {
                    return (
                              <div className="min-h-screen gradient-bg flex justify-center items-center">
                                        <div className="text-center animate-scale-in">
                                                  <div className="card-glass p-12">
                                                            <LoadingSpinner size="large" />
                                                            <p className="mt-6 text-white text-lg">Verifying your payment...</p>
                                                            <p className="text-purple-200">Please wait while we confirm your order</p>
                                                  </div>
                                        </div>
                              </div>
                    );
          }

          if (error || !payment) {
                    return (
                              <div className="min-h-screen gradient-bg flex items-center justify-center">
                                        <div className="text-center animate-scale-in">
                                                  <div className="card-glass p-12 max-w-md">
                                                            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                                                      <span className="text-white text-2xl">✕</span>
                                                            </div>
                                                            <h1 className="text-2xl font-bold text-white mb-4">Payment Verification Failed</h1>
                                                            <p className="text-purple-200 mb-8">{error || 'Unable to verify payment'}</p>
                                                            <Link
                                                                      to="/"
                                                                      className="btn-primary px-6 py-3"
                                                            >
                                                                      Go back to home
                                                            </Link>
                                                  </div>
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

                              <div className="relative py-20 px-4 sm:px-6 lg:px-8">
                                        <div className="max-w-4xl mx-auto">
                                                  {/* Success Header */}
                                                  <div className="text-center mb-12 animate-slide-up">
                                                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-8 animate-bounce-slow">
                                                                      <CheckCircle className="h-12 w-12 text-white" />
                                                            </div>
                                                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                                                      Payment
                                                                      <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                                                                Successful!
                                                                      </span>
                                                            </h1>
                                                            <p className="text-xl text-purple-200">Thank you for your purchase! Your order is being processed.</p>
                                                  </div>

                                                  {/* Order Details Card */}
                                                  <div className="card-glass p-8 mb-8 animate-scale-in">
                                                            <div className="flex items-center justify-between mb-8">
                                                                      <h2 className="text-2xl font-semibold text-white flex items-center">
                                                                                <Gift className="h-6 w-6 mr-2 text-purple-400" />
                                                                                Order Details
                                                                      </h2>
                                                                      <div className="flex items-center text-green-400">
                                                                                <Star className="h-5 w-5 mr-1" />
                                                                                <span className="font-medium">Confirmed</span>
                                                                      </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                      <div className="space-y-4">
                                                                                <div className="stagger-animation">
                                                                                          <p className="text-sm text-purple-200">Order Reference</p>
                                                                                          <p className="text-lg font-mono text-white bg-white/10 px-3 py-2 rounded-lg">{payment.reference}</p>
                                                                                </div>
                                                                                <div className="stagger-animation">
                                                                                          <p className="text-sm text-purple-200">Amount Paid</p>
                                                                                          <p className="text-2xl font-bold gradient-text">{formatAmount(payment.amount)}</p>
                                                                                </div>
                                                                      </div>
                                                                      <div className="space-y-4">
                                                                                <div className="stagger-animation">
                                                                                          <p className="text-sm text-purple-200">Date</p>
                                                                                          <p className="text-lg text-white">{formatDate(payment.createdAt)}</p>
                                                                                </div>
                                                                                <div className="stagger-animation">
                                                                                          <p className="text-sm text-purple-200">Status</p>
                                                                                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                                                                                                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                                                                                                    <span className="text-green-300 font-medium">
                                                                                                              {payment.status === 'success' ? 'Completed' : payment.status}
                                                                                                    </span>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>

                                                  {/* What's Next Section */}
                                                  <div className="card-glass p-8 mb-8 animate-slide-up">
                                                            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
                                                                      <Sparkles className="h-6 w-6 mr-2 text-purple-400" />
                                                                      What's Next?
                                                            </h2>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                      <div className="flex items-start stagger-animation">
                                                                                <div className="flex-shrink-0">
                                                                                          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 mr-4">
                                                                                                    <Calendar className="h-6 w-6 text-white" />
                                                                                          </div>
                                                                                </div>
                                                                                <div>
                                                                                          <h3 className="text-lg font-medium text-white mb-2">Order Processing</h3>
                                                                                          <p className="text-purple-200 leading-relaxed">
                                                                                                    We're processing your order right now. You'll receive a confirmation email with tracking details shortly.
                                                                                          </p>
                                                                                </div>
                                                                      </div>

                                                                      <div className="flex items-start stagger-animation">
                                                                                <div className="flex-shrink-0">
                                                                                          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 mr-4">
                                                                                                    <Truck className="h-6 w-6 text-white" />
                                                                                          </div>
                                                                                </div>
                                                                                <div>
                                                                                          <h3 className="text-lg font-medium text-white mb-2">Fast Shipping</h3>
                                                                                          <p className="text-purple-200 leading-relaxed">
                                                                                                    Your order will be shipped within 1-2 business days. Free shipping on orders over $100!
                                                                                          </p>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>

                                                  {/* Action Buttons */}
                                                  <div className="text-center animate-slide-up">
                                                            <Link
                                                                      to="/"
                                                                      className="btn-primary px-8 py-4 text-lg font-semibold hover-glow inline-flex items-center"
                                                            >
                                                                      <Sparkles className="h-5 w-5 mr-2" />
                                                                      Continue Shopping
                                                                      <ArrowRight className="ml-2 h-5 w-5" />
                                                            </Link>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
};

export default SuccessPage;