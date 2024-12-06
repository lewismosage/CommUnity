import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaBug, FaHeart, FaLightbulb } from 'react-icons/fa';

interface Update {
  version: string;
  date: string;
  type: 'feature' | 'improvement' | 'fix' | 'upcoming';
  title: string;
  description: string;
}

const WhatsNew: React.FC = () => {
  const updates: Update[] = [
    {
      version: '1.2.0',
      date: '2024-03-15',
      type: 'feature',
      title: 'Real-time Community Chat',
      description: 'Introducing live chat functionality for community groups, enabling instant communication between members.'
    },
    {
      version: '1.1.5',
      date: '2024-03-10',
      type: 'improvement',
      title: 'Enhanced Event Management',
      description: 'Improved event creation workflow with location suggestions and better date/time selection.'
    },
    {
      version: '1.1.0',
      date: '2024-03-01',
      type: 'feature',
      title: 'Community Polls & Surveys',
      description: 'New polling system allows community leaders to gather feedback and make data-driven decisions.'
    },
    {
      version: '1.0.5',
      date: '2024-02-25',
      type: 'fix',
      title: 'Performance Improvements',
      description: 'Significant speed improvements in feed loading and image optimization.'
    },
    {
      version: 'Coming Soon',
      date: '2024-Q2',
      type: 'upcoming',
      title: 'Mobile App Beta',
      description: 'Get ready for our native mobile apps, coming soon to iOS and Android!'
    }
  ];

  const getIcon = (type: Update['type']) => {
    switch (type) {
      case 'feature':
        return <FaRocket className="text-primary-600" size={24} />;
      case 'improvement':
        return <FaLightbulb className="text-yellow-500" size={24} />;
      case 'fix':
        return <FaBug className="text-green-500" size={24} />;
      case 'upcoming':
        return <FaHeart className="text-red-500" size={24} />;
    }
  };

  const getTypeLabel = (type: Update['type']) => {
    switch (type) {
      case 'feature':
        return 'New Feature';
      case 'improvement':
        return 'Improvement';
      case 'fix':
        return 'Fix & Updates';
      case 'upcoming':
        return 'Coming Soon';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">What's New in CommUnity</h1>
        <p className="text-lg text-gray-600">
          Stay up to date with the latest features, improvements, and fixes.
        </p>
      </div>

      <div className="space-y-8">
        {updates.map((update, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md
              ${update.type === 'upcoming' ? 'border-2 border-primary-100' : ''}`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getIcon(update.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{update.title}</h3>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm px-3 py-1 rounded-full
                      ${update.type === 'feature' ? 'bg-primary-100 text-primary-700' :
                        update.type === 'improvement' ? 'bg-yellow-100 text-yellow-700' :
                        update.type === 'fix' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'}`}
                    >
                      {getTypeLabel(update.type)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{update.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">Version: {update.version}</span>
                  <span>Released: {update.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Have a Feature Request?</h2>
        <p className="text-gray-600 mb-6">
          We're always looking to improve. Share your ideas and help shape the future of CommUnity.
        </p>
        <Link
          to="/feedback"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          Submit Feedback
        </Link>
      </div>
    </div>
  );
};

export default WhatsNew; 