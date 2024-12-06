import React from 'react';
import { Link } from 'react-router-dom';
import { User, getUserFullName } from '../../types';

interface UserCardProps {
  user: User;
  showBio?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, showBio = true }) => {
  return (
    <Link to={`/profile/${user.id}`} className="block">
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={getUserFullName(user)}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg font-medium">
                  {user.firstName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {getUserFullName(user)}
            </p>
            {showBio && user.bio && (
              <p className="text-sm text-gray-500 truncate">
                {user.bio}
              </p>
            )}
            <p className="text-xs text-gray-400">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard; 