import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, CalendarIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('New York');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-600 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            {...fadeIn}
          >
            Connect with Your Local Community
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8 max-w-2xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Discover events, join groups, and make a difference in your neighborhood
          </motion.p>
          
          {/* Location Selector */}
          <motion.div 
            className="flex justify-center gap-4 mb-8"
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg text-white border border-white border-opacity-30"
            >
              <option value="New York">Nairobi</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
            </select>
            <button className="px-6 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
              Explore
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Everything You Need to Engage
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <MapPinIcon className="w-8 h-8" />,
              title: "Local Events",
              description: "Discover and join events happening in your area",
              link: "/events"
            },
            {
              icon: <UserGroupIcon className="w-8 h-8" />,
              title: "Community Groups",
              description: "Connect with people who share your interests",
              link: "/groups"
            },
            {
              icon: <CalendarIcon className="w-8 h-8" />,
              title: "Resource Sharing",
              description: "Share and borrow resources within your community",
              link: "/marketplace"
            },
            {
              icon: <SparklesIcon className="w-8 h-8" />,
              title: "Local Impact",
              description: "Make a difference through community initiatives",
              link: "/community-initiatives"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={feature.link}>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Join Your Community?
          </h2>
          <p className="text-white text-lg mb-8">
            Start connecting with your neighbors and make a difference today.
          </p>
          <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            Get Started
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home; 