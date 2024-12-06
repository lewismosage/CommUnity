import React from 'react';
import { Link } from 'react-router-dom';
import { Group } from '../../../types';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <Link to={`/groups/${group.id}`} className="block">
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="relative">
          <div className="flex items-center space-x-4">
            {(group.avatar || group.image) ? (
              <img
                src={group.avatar || group.image}
                alt={group.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 text-lg font-semibold">
                  {group.name[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {group.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {group.memberCount} members
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard; 