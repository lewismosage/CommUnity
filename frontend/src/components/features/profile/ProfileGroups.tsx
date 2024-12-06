import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserGroups } from '../../../store/slices/profileSlice';
import GroupCard from '../groups/GroupCard';
import LoadingSpinner from '../../common/LoadingSpinner';

interface Group {
  id: string;
  name: string;
  description: string;
  members: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

interface ProfileGroupsProps {
  userId: string;
}

const ProfileGroups: React.FC<ProfileGroupsProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { groups, loading } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserGroups(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!groups.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No groups to display
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {groups.map((group: Group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default ProfileGroups; 