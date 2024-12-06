import React from 'react';
import { useParams } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaComments, FaChartLine } from 'react-icons/fa';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export const CommunityAnalytics: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const stats: StatCard[] = [
    {
      title: 'Total Members',
      value: '245',
      change: 12.5,
      icon: <FaUsers className="text-blue-500" />
    },
    {
      title: 'Active Events',
      value: '8',
      change: 8.2,
      icon: <FaCalendarAlt className="text-green-500" />
    },
    {
      title: 'Engagement Rate',
      value: '67%',
      change: -2.4,
      icon: <FaComments className="text-purple-500" />
    },
    {
      title: 'Growth Rate',
      value: '23%',
      change: 5.7,
      icon: <FaChartLine className="text-red-500" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Community Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-gray-50">
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change >= 0 ? '+' : ''}{stat.change}%
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Growth</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart Component Here
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart Component Here
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityAnalytics; 