import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Search } from 'lucide-react';

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

          return (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                              {/* Hero section */}
                              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl mb-8 overflow-hidden">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                                                  <div className="md:flex md:items-center md:justify-between">
                                                            <div className="md:w-3/5">
                                                                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                                                                Shop With Confidence
                                                                      </h1>
                                                                      <p className="mt-4 text-lg text-blue-100">
                                                                                Discover amazing products with secure payment options. Your trusted online shopping destination.
                                                                      </p>
                                                                      <div className="mt-8">
                                                                                <div className="flex items-center max-w-md rounded-full bg-white p-1">
                                                                                          <div className="pl-3 flex items-center pointer-events-none">
                                                                                                    <Search className="h-5 w-5 text-gray-400" />
                                                                                          </div>
                                                                                          <input
                                                                                                    type="text"
                                                                                                    placeholder="Search products..."
                                                                                                    value={searchTerm}
                                                                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                                                                    className="w-full pl-2 pr-4 py-2 text-sm text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
                                                                                          />
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                            <div className="hidden md:block md:w-2/5">
                                                                      <img
                                                                                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                                                                alt="Shopping"
                                                                                className="w-full h-64 object-cover rounded-lg shadow-lg"
                                                                      />
                                                            </div>
                                                  </div>
                                        </div>
                              </div>

                              {/* Category filters */}
                              <div className="mb-8">
                                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                                        <div className="flex flex-wrap gap-2">
                                                  {categories.map((category) => (
                                                            <button
                                                                      key={category}
                                                                      onClick={() => setSelectedCategory(category)}
                                                                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                                                                          ? 'bg-blue-500 text-white'
                                                                                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                                                                }`}
                                                            >
                                                                      {category.charAt(0).toUpperCase() + category.slice(1)}
                                                            </button>
                                                  ))}
                                        </div>
                              </div>

                              {/* Products section */}
                              <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
                                        {loading ? (
                                                  <div className="flex justify-center py-12">
                                                            <LoadingSpinner size="large" />
                                                  </div>
                                        ) : error ? (
                                                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                                            {error}
                                                  </div>
                                        ) : filteredProducts.length === 0 ? (
                                                  <div className="text-center py-12">
                                                            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
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
          );
};

export default HomePage;