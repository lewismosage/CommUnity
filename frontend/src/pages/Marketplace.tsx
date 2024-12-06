import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TagIcon, 
  MapPinIcon, 
  PlusIcon,
  FunnelIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const MOCK_ITEMS = [
  {
    id: 1,
    title: "Mountain Bike",
    price: 150,
    category: "Sports",
    condition: "Good",
    location: "Brooklyn, NY",
    description: "Trek mountain bike, perfect for weekend adventures. Barely used.",
    image: "https://source.unsplash.com/random/800x600/?mountain-bike",
    seller: {
      name: "Alex Johnson",
      rating: 4.8
    }
  },
  {
    id: 2,
    title: "Gardening Tools Set",
    price: 45,
    category: "Home & Garden",
    condition: "Like New",
    location: "Queens, NY",
    description: "Complete set of gardening tools. Includes shovel, rake, and pruning shears.",
    image: "https://source.unsplash.com/random/800x600/?gardening-tools",
    seller: {
      name: "Maria Garcia",
      rating: 4.9
    }
  },
  // Add more mock items as needed
];

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const navigate = useNavigate();

  const handleMessageClick = (sellerName: string) => {
    // Navigate to Messages page and pass sellerName as state
    navigate('/messages', { state: { sellerName } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Community Marketplace</h1>
              <p className="text-gray-600 mt-1">Buy, sell, and share within your community</p>
            </div>
            <button 
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              List Item
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search items..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="sports">Sports & Outdoors</option>
              <option value="home">Home & Garden</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books & Media</option>
            </select>
            <button 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {MOCK_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                  {item.condition}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <span className="text-lg font-bold text-primary-600">${item.price}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <TagIcon className="w-5 h-5 mr-2" />
                    {item.category}
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    {item.location}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                      {item.seller.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.seller.name}</p>
                      <p className="text-xs text-gray-500">★ {item.seller.rating}</p>
                    </div>
                  </div>
                  <button 
                    className="inline-flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => handleMessageClick(item.seller.name)}
                  >
                    <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
                    Message
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marketplace; 