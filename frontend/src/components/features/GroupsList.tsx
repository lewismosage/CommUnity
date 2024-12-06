import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGroups } from '../../store/slices/groupSlice';
import GroupCard from './groups/GroupCard';
import LoadingSpinner from '../common/LoadingSpinner';

const GroupsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { groups, loading } = useAppSelector((state) => state.groups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (groups.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No groups found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupsList; 