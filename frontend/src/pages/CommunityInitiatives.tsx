import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  UserGroupIcon, 
  GlobeAltIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';

const MOCK_INITIATIVES = [
  {
    id: 1,
    title: "Community Garden Project",
    category: "Environment",
    participants: 45,
    location: "Central Park Area",
    description: "Help create and maintain community gardens to promote sustainable living and food security.",
    image: "https://source.unsplash.com/random/800x600/?garden",
    progress: 75
  },
  {
    id: 2,
    title: "Youth Mentorship Program",
    category: "Education",
    participants: 28,
    location: "Local Schools",
    description: "Connect with local youth to provide guidance and support in education and career development.",
    image: "https://source.unsplash.com/random/800x600/?mentorship",
    progress: 60
  },
  // Add more initiatives as needed
];

const CommunityInitiatives: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">Community Initiatives</h1>
          <p className="text-xl opacity-90">Make a difference in your community</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <HeartIcon className="w-6 h-6" />, label: "Volunteer" },
            { icon: <UserGroupIcon className="w-6 h-6" />, label: "Community Support" },
            { icon: <GlobeAltIcon className="w-6 h-6" />, label: "Environment" },
            { icon: <HandRaisedIcon className="w-6 h-6" />, label: "Social Causes" }
          ].map((category, index) => (
            <button
              key={index}
              className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Initiatives Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {MOCK_INITIATIVES.map((initiative, index) => (
            <motion.div
              key={initiative.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48">
                <img 
                  src={initiative.image} 
                  alt={initiative.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                  {initiative.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                <p className="text-gray-600 mb-4">{initiative.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{initiative.participants} participants</span>
                  <span>{initiative.location}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${initiative.progress}%` }}
                  />
                </div>

                <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Join Initiative
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityInitiatives; 