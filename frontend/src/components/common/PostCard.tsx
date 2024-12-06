import React from 'react';
import { Link } from 'react-router-dom';
import { User, getUserFullName } from '../../types';

interface PostCardProps {
  post: {
    id: string;
    content: string;
    author: User;
    createdAt: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Link to={`/profile/${post.author.username}`} className="font-medium text-gray-900">
          {getUserFullName(post.author)}
        </Link>
        <span className="text-gray-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};

export default PostCard; 