import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { API_URL } from '../config';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { CheckCircle, Calendar, Truck, ArrowRight } from 'lucide-react';
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
                              <div className="flex justify-center items-center min-h-[70vh]">
                                        <div className="text-center">
                                                  <LoadingSpinner size="large" />
                                                  <p className="mt-4 text-gray-600">Verifying your payment...</p>
                                        </div>
                              </div>
                    );
          }

          if (error || !payment) {
                    return (
                              <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                                        <div className="text-center">
                                                  <h1 className="text-3xl font-extrabold text-red-600">Payment Verification Failed</h1>
                                                  <p className="mt-2 text-lg text-gray-500">{error || 'Unable to verify payment'}</p>
                                                  <div className="mt-6">
                                                            <Link
                                                                      to="/"
                                                                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                                            >
                                                                      Go back to home
                                                            </Link>
                                                  </div>
                                        </div>
                              </div>
                    );
          }

          return (
                    <div className="bg-gray-50 min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
                              <div className="max-w-3xl mx-auto">
                                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                                  {/* Header */}
                                                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-white text-center">
                                                            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
                                                            <h1 className="text-3xl font-bold">Payment Successful!</h1>
                                                            <p className="mt-2 text-green-100">Thank you for your purchase</p>
                                                  </div>

                                                  {/* Order details */}
                                                  <div className="p-6">
                                                            <div className="border-b border-gray-200 pb-6">
                                                                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
                                                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                <div>
                                                                                          <p className="text-sm text-gray-500">Order Reference</p>
                                                                                          <p className="text-base font-medium text-gray-900">{payment.reference}</p>
                                                                                </div>
                                                                                <div>
                                                                                          <p className="text-sm text-gray-500">Amount Paid</p>
                                                                                          <p className="text-base font-medium text-gray-900">{formatAmount(payment.amount)}</p>
                                                                                </div>
                                                                                <div>
                                                                                          <p className="text-sm text-gray-500">Date</p>
                                                                                          <p className="text-base font-medium text-gray-900">{formatDate(payment.createdAt)}</p>
                                                                                </div>
                                                                                <div>
                                                                                          <p className="text-sm text-gray-500">Status</p>
                                                                                          <p className="text-base font-medium text-emerald-600">
                                                                                                    {payment.status === 'success' ? 'Completed' : payment.status}
                                                                                          </p>
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* What's next */}
                                                            <div className="pt-6">
                                                                      <h2 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h2>
                                                                      <div className="space-y-4">
                                                                                <div className="flex items-start">
                                                                                          <div className="flex-shrink-0">
                                                                                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                                                                                                              <Calendar className="h-5 w-5" />
                                                                                                    </div>
                                                                                          </div>
                                                                                          <div className="ml-4">
                                                                                                    <h3 className="text-base font-medium text-gray-900">Order Processing</h3>
                                                                                                    <p className="mt-1 text-sm text-gray-500">
                                                                                                              We're processing your order. You'll receive a confirmation email shortly.
                                                                                                    </p>
                                                                                          </div>
                                                                                </div>

                                                                                <div className="flex items-start">
                                                                                          <div className="flex-shrink-0">
                                                                                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                                                                                                              <Truck className="h-5 w-5" />
                                                                                                    </div>
                                                                                          </div>
                                                                                          <div className="ml-4">
                                                                                                    <h3 className="text-base font-medium text-gray-900">Shipping</h3>
                                                                                                    <p className="mt-1 text-sm text-gray-500">
                                                                                                              Your order will be shipped within 1-2 business days. You'll receive tracking information.
                                                                                                    </p>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="mt-8 flex justify-center">
                                                                      <Link
                                                                                to="/"
                                                                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                      >
                                                                                Continue Shopping
                                                                                <ArrowRight className="ml-2 h-4 w-4" />
                                                                      </Link>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
};

export default SuccessPage;