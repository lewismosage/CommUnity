import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserPlus, FaUserMinus, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

interface Member {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  joinedDate: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'pending';
}

export const CommunityManage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'members' | 'pending'>('members');

  // Mock data - replace with API call
  const members: Member[] = [
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      joinedDate: '2024-01-15',
      role: 'member',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      joinedDate: '2024-02-01',
      role: 'moderator',
      status: 'active'
    },
    {
      id: '3',
      name: 'Alice Johnson',
      username: 'alicej',
      joinedDate: '2024-03-01',
      role: 'member',
      status: 'pending'
    }
  ];

  const filteredMembers = members.filter(member => 
    (selectedTab === 'pending' ? member.status === 'pending' : member.status === 'active') &&
    (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     member.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRemoveMember = (memberId: string) => {
    // TODO: Implement API call to remove member
    console.log('Removing member:', memberId);
  };

  const handleApproveMember = (memberId: string) => {
    // TODO: Implement API call to approve member
    console.log('Approving member:', memberId);
  };

  const handleRejectMember = (memberId: string) => {
    // TODO: Implement API call to reject member
    console.log('Rejecting member:', memberId);
  };

  const handleRoleChange = (memberId: string, newRole: Member['role']) => {
    // TODO: Implement API call to change member role
    console.log('Changing role:', memberId, newRole);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Community Members</h1>
        <p className="mt-2 text-gray-600">
          Add, remove, or manage roles of community members
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTab('members')}
              className={`px-4 py-2 rounded-md ${
                selectedTab === 'members'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Active Members
            </button>
            <button
              onClick={() => setSelectedTab('pending')}
              className={`px-4 py-2 rounded-md ${
                selectedTab === 'pending'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Pending Requests
            </button>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {member.avatar ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={member.avatar}
                          alt={member.name}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {member.name[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">@{member.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.status === 'active' ? (
                    <select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value as Member['role'])}
                      className="text-sm rounded-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="member">Member</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(member.joinedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {member.status === 'pending' ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleApproveMember(member.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FaCheck className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleRejectMember(member.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTimes className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaUserMinus className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityManage; 