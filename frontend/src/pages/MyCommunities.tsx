import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaPlus, FaCog, FaChartLine, FaFolder } from 'react-icons/fa';
import CreateCommunityModal, { CommunityFormData } from '../components/features/communities/CreateCommunityModal';

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  image?: string;
  category: string;
  isAdmin: boolean;
  pendingMembers?: number;
  resourceCount?: number;
}

export const MyCommunities: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const communities: Community[] = [
    {
      id: '1',
      name: 'Tech Innovators',
      description: 'A community for technology enthusiasts and innovators.',
      memberCount: 1234,
      category: 'Technology',
      isAdmin: true,
      pendingMembers: 5,
      resourceCount: 23
    },
    {
      id: '2',
      name: 'Green Earth Initiative',
      description: 'Working together for a sustainable future.',
      memberCount: 567,
      category: 'Environment',
      isAdmin: false,
      resourceCount: 15
    }
  ];

  const handleCreateCommunity = (communityData: CommunityFormData) => {
    // TODO: Implement API call to create community
    console.log('Creating community:', communityData);

    // Mock adding the new community
    const newCommunity = {
      id: String(communities.length + 1),
      name: communityData.name,
      description: communityData.description,
      memberCount: 1,
      category: communityData.category,
      location: communityData.location,
      isAdmin: true,
      pendingMembers: 0,
      resourceCount: 0
    };

    // Add to communities list
    communities.push(newCommunity);

    // Navigate to the groups page or show success message
    navigate('/groups');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Communities</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <FaPlus className="mr-2" />
          Create Community
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <div key={community.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{community.name}</h3>
                    <p className="text-sm text-gray-500">{community.category}</p>
                  </div>
                </div>
                {community.isAdmin && (
                  <span className="px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
                    Admin
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{community.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  {community.memberCount.toLocaleString()} members
                </span>
                {community.isAdmin && community.pendingMembers && (
                  <span className="text-sm text-orange-600">
                    {community.pendingMembers} pending approvals
                  </span>
                )}
              </div>

              {community.isAdmin ? (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Link
                        to={`/communities/${community.id}/settings`}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                      >
                        <FaCog className="mr-1" />
                        <span className="text-sm">Settings</span>
                      </Link>
                      <Link
                        to={`/communities/${community.id}/resources`}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                      >
                        <FaFolder className="mr-1" />
                        <span className="text-sm">{community.resourceCount} Resources</span>
                      </Link>
                      <Link
                        to={`/communities/${community.id}/analytics`}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                      >
                        <FaChartLine className="mr-1" />
                        <span className="text-sm">Analytics</span>
                      </Link>
                    </div>
                    <Link
                      to={`/communities/${community.id}/manage`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  to={`/communities/${community.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View Details
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {communities.length === 0 && (
        <div className="text-center py-12">
          <FaUsers className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No communities yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new community.</p>
          <div className="mt-6">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <FaPlus className="mr-2" />
              Create Community
            </button>
          </div>
        </div>
      )}

      <CreateCommunityModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCommunity}
      />
    </div>
  );
};

export default MyCommunities; 