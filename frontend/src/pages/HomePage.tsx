import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Search, Star, Shield, Truck, CreditCard, Users, TrendingUp, Award } from 'lucide-react';

interface Product {
          _id: string;
          name: string;
          price: number;
          image: string;
          description: string;
          category: string;
}

const HomePage = () => {
          const [products, setProducts] = useState<Product[]>([]);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState<string | null>(null);
          const [searchTerm, setSearchTerm] = useState('');
          const [selectedCategory, setSelectedCategory] = useState('all');

          useEffect(() => {
                    const fetchProducts = async () => {
                              try {
                                        setLoading(true);
                                        const response = await axios.get(`${API_URL}/api/products`);
                                        setProducts(response.data);
                                        setError(null);
                              } catch (err) {
                                        setError('Failed to fetch products. Please try again later.');
                                        console.error('Error fetching products:', err);
                              } finally {
                                        setLoading(false);
                              }
                    };

                    fetchProducts();
          }, []);

          // Extract unique categories from products
          const categories = ['all', ...new Set(products.map(product => product.category))];

          // Filter products based on search term and selected category
          const filteredProducts = products.filter(product => {
                    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

                    return matchesSearch && matchesCategory;
          });

          const stats = [
                    { icon: Users, label: 'Happy Customers', value: '50K+' },
                    { icon: Award, label: 'Products Sold', value: '100K+' },
                    { icon: TrendingUp, label: 'Growth Rate', value: '150%' },
                    { icon: Star, label: 'Customer Rating', value: '4.9/5' },
          ];

          const features = [
                    {
                              icon: Shield,
                              title: 'Secure Payments',
                              description: 'Your payment information is encrypted and secure with Paystack integration.'
                    },
                    {
                              icon: Truck,
                              title: 'Fast Delivery',
                              description: 'Free shipping on orders over $100. Delivery within 3-5 business days.'
                    },
                    {
                              icon: CreditCard,
                              title: 'Multiple Payment Options',
                              description: 'Pay with credit cards, bank transfers, and other convenient methods.'
                    },
                    {
                              icon: Star,
                              title: 'Quality Guarantee',
                              description: '30-day money-back guarantee on all products. Shop with confidence.'
                    }
          ];

          return (
                    <div className="min-h-screen">
                              {/* Hero Section with Gradient */}
                              <div className="relative overflow-hidden">
                                        {/* Background Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>

                                        {/* Animated Background Elements */}
                                        <div className="absolute inset-0 opacity-20">
                                                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                                                  <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                                                  <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
                                        </div>

                                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                                                  <div className="text-center">
                                                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                                                                      Shop the
                                                                      <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                                                                Future Today
                                                                      </span>
                                                            </h1>
                                                            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                                                                      Discover amazing products with secure payments, fast delivery, and unmatched quality.
                                                                      Your premium shopping experience starts here.
                                                            </p>

                                                            {/* Search Bar */}
                                                            <div className="max-w-2xl mx-auto mb-12">
                                                                      <div className="relative">
                                                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                                                          <Search className="h-6 w-6 text-purple-300" />
                                                                                </div>
                                                                                <input
                                                                                          type="text"
                                                                                          placeholder="Search for products..."
                                                                                          value={searchTerm}
                                                                                          onChange={(e) => setSearchTerm(e.target.value)}
                                                                                          className="w-full pl-12 pr-6 py-4 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                                                                                />
                                                                      </div>
                                                            </div>

                                                            {/* CTA Buttons */}
                                                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                                                      <button
                                                                                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                                                                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                                                                      >
                                                                                Explore Products
                                                                      </button>
                                                                      <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                                                                                Learn More
                                                                      </button>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>

                              {/* Stats Section */}
                              <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                                            {stats.map((stat, index) => (
                                                                      <div key={index} className="text-center">
                                                                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4">
                                                                                          <stat.icon className="h-8 w-8 text-white" />
                                                                                </div>
                                                                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                                                                <div className="text-gray-600">{stat.label}</div>
                                                                      </div>
                                                            ))}
                                                  </div>
                                        </div>
                              </div>

                              {/* Features Section */}
                              <div className="py-20 bg-white">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                  <div className="text-center mb-16">
                                                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                                                      Why Choose <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Shop~hera</span>
                                                            </h2>
                                                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                                                      We provide the best shopping experience with cutting-edge technology and customer-first approach.
                                                            </p>
                                                  </div>

                                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                                            {features.map((feature, index) => (
                                                                      <div key={index} className="group p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                                                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                                                                          <feature.icon className="h-8 w-8 text-white" />
                                                                                </div>
                                                                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                                                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                                                      </div>
                                                            ))}
                                                  </div>
                                        </div>
                              </div>

                              {/* Products Section */}
                              <div id="products" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                  {/* Category Filters */}
                                                  <div className="mb-12">
                                                            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
                                                                      Featured <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Products</span>
                                                            </h2>
                                                            <div className="flex flex-wrap justify-center gap-3">
                                                                      {categories.map((category) => (
                                                                                <button
                                                                                          key={category}
                                                                                          onClick={() => setSelectedCategory(category)}
                                                                                          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                                                                                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                                                                                                              : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 border border-gray-200'
                                                                                                    }`}
                                                                                >
                                                                                          {category.charAt(0).toUpperCase() + category.slice(1)}
                                                                                </button>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  {/* Products Grid */}
                                                  {loading ? (
                                                            <div className="flex justify-center py-20">
                                                                      <LoadingSpinner size="large" />
                                                            </div>
                                                  ) : error ? (
                                                            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center">
                                                                      {error}
                                                            </div>
                                                  ) : filteredProducts.length === 0 ? (
                                                            <div className="text-center py-20">
                                                                      <p className="text-gray-500 text-xl">No products found matching your criteria.</p>
                                                            </div>
                                                  ) : (
                                                            <div className="product-grid">
                                                                      {filteredProducts.map((product) => (
                                                                                <ProductCard key={product._id} product={product} />
                                                                      ))}
                                                            </div>
                                                  )}
                                        </div>
                              </div>
                    </div>
          );
};

export default HomePage;