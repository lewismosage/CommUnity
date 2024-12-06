import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import environmentalImage from "../assets/images/groups/environmental.jpg";
import techImage from "../assets/images/groups/tech.jpg";
import faithImage from "../assets/images/groups/faith.jpg";

const MOCK_GROUPS = [
  {
    id: 1,
    name: "Environmental Warriors",
    category: "Environment",
    members: 234,
    location: "Nairobi, Kenya",
    description:
      "A community dedicated to environmental conservation and sustainable living practices.",
    image: environmentalImage,
  },
  {
    id: 2,
    name: "Tech Innovators",
    category: "Technology",
    members: 156,
    location: "Nairobi, Kenya",
    description:
      "Discussing latest tech trends and building innovative solutions together.",
    image: techImage,
  },
  {
    id: 3,
    name: "Faith Fellowship",
    category: "Christian Community",
    members: 85,
    location: "Nairobi, Kenya",
    description:
      "A community dedicated to growing in faith, supporting each other, and sharing the love of Christ.",
    image: faithImage,
  },
  // Add more mock groups as needed
];

const Groups: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Community Groups
            </h1>
            <Link 
              to="/my-communities"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Create Group
            </Link>
          </div>

          {/* Search */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {MOCK_GROUPS.map((group, index) => (
            <motion.div
              key={group.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                  {group.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {group.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <UserGroupIcon className="w-5 h-5 mr-2" />
                    {group.members} members
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    {group.location}
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Join Group
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Groups;
