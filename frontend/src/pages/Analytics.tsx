import React from 'react';
import { FaUsers, FaCalendarAlt, FaComments, FaChartLine } from 'react-icons/fa';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export const Analytics: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Total Members',
      value: '2,451',
      change: 12.5,
      icon: <FaUsers className="text-blue-500" />
    },
    {
      title: 'Active Events',
      value: '45',
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Track your community's growth and engagement metrics
        </p>
      </div>

      {/* Stats Grid */}
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

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Member Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Growth</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart Component Here
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart Component Here
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <FaUsers className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">New member joined the community</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 