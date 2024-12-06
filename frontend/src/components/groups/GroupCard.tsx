import React from 'react';
import { Link } from 'react-router-dom';
import { Group } from '../../types';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <Link to={`/groups/${group.id}`} className="block">
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          {group.avatar ? (
            <img
              src={group.avatar}
              alt={group.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-lg">
                {group.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {group.description}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {group.members.length} members
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard; 