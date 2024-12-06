import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserAvatar from '../components/common/UserAvatar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import PostCard from '../components/common/PostCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProfile } from '../store/slices/profileSlice';
import EditProfileModal from '../components/features/profile/EditProfileModal';
import profileService from '../services/profileService';

interface ProfileStats {
  posts: number;
  events: number;
  groups: number;
  connections: number;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  location: string;
  interests: string[];
  joinedDate: string;
  profileStats: ProfileStats;
}

const Profile: React.FC = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.profile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'events' | 'groups'>('posts');
  const [tabData, setTabData] = useState<any[]>([]);
  const [tabLoading, setTabLoading] = useState(false);
  const currentUser = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    if (username) {
      dispatch(fetchProfile(username));
    }
  }, [dispatch, username]);

  useEffect(() => {
    const fetchTabData = async () => {
      setTabLoading(true);
      try {
        let data;
        switch (activeTab) {
          case 'posts':
            data = await profileService.getUserPosts(username!);
            break;
          case 'events':
            data = await profileService.getUserEvents(username!);
            break;
          case 'groups':
            data = await profileService.getUserGroups(username!);
            break;
        }
        setTabData(data);
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
      } finally {
        setTabLoading(false);
      }
    };

    if (username) {
      fetchTabData();
    }
  }, [activeTab, username]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Error loading profile</h2>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <UserAvatar 
            name={`${profile.firstName} ${profile.lastName}`} 
            size="lg" 
            className="w-24 h-24 text-2xl"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-gray-500">@{profile.username}</p>
            <p className="mt-2 text-gray-700">{profile.bio}</p>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <span>📍 {profile.location}</span>
              <span>���� Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          {isOwnProfile ? (
            <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
              Edit Profile
            </Button>
          ) : (
            <Button>Connect</Button>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-6">
          {Object.entries(profile.profileStats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500 capitalize">{key}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {(['posts', 'events', 'groups'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {/* Example post - replace with actual posts */}
              <PostCard
                key="1"
                post={{
                  id: '1',
                  content: 'Just joined a new environmental initiative in the city! Looking forward to making a difference.',
                  author: {
                    id: '1',
                    username: profile.username,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    email: `${profile.username}@example.com`,
                    createdAt: profile.joinedDate,
                    updatedAt: profile.joinedDate,
                  },
                  createdAt: new Date().toISOString()
                }}
              />
            </div>
          )}
          {activeTab === 'events' && (
            <div className="text-gray-500">No events to display</div>
          )}
          {activeTab === 'groups' && (
            <div className="text-gray-500">No groups to display</div>
          )}
        </div>
      </div>

      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
        />
      )}
    </div>
  );
};

export default Profile; 