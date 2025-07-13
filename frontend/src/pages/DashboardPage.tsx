import { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Bell, Star, TrendingUp, Gamepad2, Crown, Zap } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
          const [activeCategory, setActiveCategory] = useState('featured');
          const [cartItems, setCartItems] = useState(3);
          const [isLoading, setIsLoading] = useState(true);
          // const  currentUser  = useAuth();
          // const navigate = useNavigate();

          useEffect(() => {
                    const timer = setTimeout(() => setIsLoading(false), 1000);
                    return () => clearTimeout(timer);
          }, []);

          const featuredGames = [
                    {
                              id: 1,
                              title: "Cyber Legends 2077",
                              price: 59.99,
                              originalPrice: 79.99,
                              image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
                              rating: 4.8,
                              discount: 25,
                              category: "RPG"
                    },
                    {
                              id: 2,
                              title: "Space Odyssey",
                              price: 39.99,
                              originalPrice: 49.99,
                              image: "https://images.unsplash.com/photo-1656381620321-bddff61435c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BhY2UlMjBvZGVzc3l8ZW58MHx8MHx8fDA%3D",
                              rating: 4.6,
                              discount: 20,
                              category: "Adventure"
                    },
                    {
                              id: 3,
                              title: "Neon Racing",
                              price: 29.99,
                              originalPrice: 39.99,
                              image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
                              rating: 4.7,
                              discount: 25,
                              category: "Racing"
                    }
          ];

          const categories = [
                    { id: 'featured', name: 'Featured', icon: Star },
                    { id: 'trending', name: 'Trending', icon: TrendingUp },
                    { id: 'action', name: 'Action', icon: Zap },
                    { id: 'rpg', name: 'RPG', icon: Crown }
          ];

          const addToCart = (gameId: number) => {
                    setCartItems(prev => prev + 1);
                    const button = document.querySelector(`[data-game-id="${gameId}"]`);
                    if (button) {
                              button.classList.add('animate-bounce');
                              setTimeout(() => button.classList.remove('animate-bounce'), 600);
                    }
          };

          // const getDisplayName = () => {
          //           if (!currentUser) return 'Guest';

          //           // First try name, then email username
          //           if (currentUser.name) {
          //                     return currentUser.name.split(' ')[0]; // Return first name only
          //           }

          //           if (currentUser.email) {
          //                     return currentUser.email.split('@')[0]; // Return email username
          //           }

          //           return 'Gamer';
          // };

          if (isLoading) {
                    return (
                              <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                                        <div className="text-center">
                                                  <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                                  <p className="text-white text-xl font-semibold">Loading your gaming universe...</p>
                                        </div>
                              </div>
                    );
          }

          return (
                    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
                              {/* Animated Background Elements */}
                              <div className="fixed inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                                        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                                        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                              </div>

                              {/* Header */}
                              <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                  <div className="flex items-center justify-between h-16">
                                                            <div className="flex items-center space-x-4">
                                                                      <div className="flex items-center space-x-2">
                                                                                <Gamepad2 className="w-8 h-8 text-purple-400" />
                                                                                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                                                          GameShop
                                                                                </h1>
                                                                      </div>
                                                            </div>

                                                            <div className="flex-1 max-w-md mx-8">
                                                                      <div className="relative">
                                                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                                                <input
                                                                                          type="text"
                                                                                          placeholder="Search for games..."
                                                                                          className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                                                                                />
                                                                      </div>
                                                            </div>

                                                            <div className="flex items-center space-x-4">
                                                                      <button className="relative p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110">
                                                                                <Bell className="w-6 h-6" />
                                                                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                                                                      </button>

                                                                      <button className="relative p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110">
                                                                                <ShoppingCart className="w-6 h-6" />
                                                                                {cartItems > 0 && (
                                                                                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-xs flex items-center justify-center font-bold animate-bounce">
                                                                                                    {cartItems}
                                                                                          </span>
                                                                                )}
                                                                      </button>

                                                                      <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-md">
                                                                                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                                                                                          <User className="w-4 h-4 text-white" />
                                                                                </div>
                                                                                <span className="text-sm font-medium"> welcome</span>
                                                                                {/* getDisplayNmae */}
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                              </header>

                              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                                  {/* Sidebar */}
                                                  <div className="lg:col-span-1">
                                                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                                                      <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                                                Categories
                                                                      </h2>
                                                                      <div className="space-y-2">
                                                                                {categories.map((category) => {
                                                                                          const IconComponent = category.icon;
                                                                                          return (
                                                                                                    <button
                                                                                                              key={category.id}
                                                                                                              onClick={() => setActiveCategory(category.id)}
                                                                                                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${activeCategory === category.id
                                                                                                                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25'
                                                                                                                                  : 'hover:bg-white/10'
                                                                                                                        }`}
                                                                                                    >
                                                                                                              <IconComponent className="w-5 h-5" />
                                                                                                              <span className="font-medium">{category.name}</span>
                                                                                                    </button>
                                                                                          );
                                                                                })}
                                                                      </div>

                                                                      <div className="mt-8 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30">
                                                                                <h3 className="font-bold text-lg mb-2">🎉 Special Offer</h3>
                                                                                <p className="text-sm text-gray-300 mb-3">Get 30% off on your next purchase!</p>
                                                                                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                                                                          Claim Now
                                                                                </button>
                                                                      </div>
                                                            </div>
                                                  </div>

                                                  {/* Main Content */}
                                                  <div className="lg:col-span-3">
                                                            {/* Hero Section */}
                                                            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20 relative overflow-hidden">
                                                                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-pulse"></div>
                                                                      <div className="relative z-10">
                                                                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                                                                          {/* Welcome back, {getDisplayName()}! */}
                                                                                </h2>
                                                                                <p className="text-xl text-gray-200 mb-6">
                                                                                          Discover amazing games tailored just for you
                                                                                </p>
                                                                                <div className="flex items-center space-x-4">
                                                                                          <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                                                                                                    <Star className="w-4 h-4 text-yellow-400" />
                                                                                                    <span className="text-sm">Level 47 Gamer</span>
                                                                                          </div>
                                                                                          <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                                                                                                    <Zap className="w-4 h-4 text-blue-400" />
                                                                                                    <span className="text-sm">1,247 XP</span>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* Games Grid */}
                                                            <div className="mb-6">
                                                                      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                                                {activeCategory === 'featured'
                                                                                          ? 'Featured Games'
                                                                                          : activeCategory === 'trending'
                                                                                                    ? 'Trending Now'
                                                                                                    : activeCategory === 'action'
                                                                                                              ? 'Action Games'
                                                                                                              : 'RPG Adventures'}
                                                                      </h3>

                                                                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                                                {featuredGames.map((game, index) => (
                                                                                          <div
                                                                                                    key={game.id}
                                                                                                    className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                                                                                                    style={{ animationDelay: `${index * 150}ms` }}
                                                                                          >
                                                                                                    <div className="relative overflow-hidden">
                                                                                                              <img
                                                                                                                        src={game.image}
                                                                                                                        alt={game.title}
                                                                                                                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                                                                                              />
                                                                                                              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                                                                                                                        -{game.discount}%
                                                                                                              </div>
                                                                                                              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-2 py-1 flex items-center space-x-1">
                                                                                                                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                                                                                        <span className="text-xs text-white">{game.rating}</span>
                                                                                                              </div>
                                                                                                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                                                                    </div>

                                                                                                    <div className="p-6">
                                                                                                              <div className="flex items-center justify-between mb-2">
                                                                                                                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                                                                                                                                  {game.category}
                                                                                                                        </span>
                                                                                                              </div>

                                                                                                              <h4 className="text-lg font-bold mb-2 group-hover:text-purple-300 transition-colors duration-300">
                                                                                                                        {game.title}
                                                                                                              </h4>

                                                                                                              <div className="flex items-center justify-between">
                                                                                                                        <div className="flex items-center space-x-2">
                                                                                                                                  <span className="text-2xl font-bold text-green-400">
                                                                                                                                            ${game.price}
                                                                                                                                  </span>
                                                                                                                                  <span className="text-sm text-gray-400 line-through">
                                                                                                                                            ${game.originalPrice}
                                                                                                                                  </span>
                                                                                                                        </div>

                                                                                                                        <button
                                                                                                                                  data-game-id={game.id}
                                                                                                                                  onClick={() => addToCart(game.id)}
                                                                                                                                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-3 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-purple-500/25"
                                                                                                                        >
                                                                                                                                  Add to Cart
                                                                                                                        </button>
                                                                                                              </div>
                                                                                                    </div>
                                                                                          </div>
                                                                                ))}
                                                                      </div>
                                                            </div>

                                                            {/* Stats Section */}
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
                                                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                                          <Gamepad2 className="w-6 h-6 text-white" />
                                                                                </div>
                                                                                <h4 className="text-2xl font-bold mb-2">127</h4>
                                                                                <p className="text-gray-300">Games Owned</p>
                                                                      </div>

                                                                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
                                                                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                                          <TrendingUp className="w-6 h-6 text-white" />
                                                                                </div>
                                                                                <h4 className="text-2xl font-bold mb-2">89h</h4>
                                                                                <p className="text-gray-300">This Month</p>
                                                                      </div>

                                                                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
                                                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                                          <Crown className="w-6 h-6 text-white" />
                                                                                </div>
                                                                                <h4 className="text-2xl font-bold mb-2">42</h4>
                                                                                <p className="text-gray-300">Achievements</p>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
};

export default Dashboard;