import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserEvents } from '../../../store/slices/profileSlice';
import EventCard from '../events/EventCard';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Event } from '../../../types';

interface ProfileEventsProps {
  userId: string;
}

// Define a type for the raw event data that might be missing some properties
interface RawEvent extends Omit<Event, 'attendeeCount'> {
  attendeeCount?: number;
}

const ProfileEvents: React.FC<ProfileEventsProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { events, loading } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserEvents(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!events.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No events to display
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => {
        // Cast the raw event to our RawEvent type
        const rawEvent = event as RawEvent;
        const completeEvent: Event = {
          ...rawEvent,
          attendeeCount: rawEvent.attendeeCount ?? rawEvent.attendees ?? 0
        };
        return <EventCard key={completeEvent.id} event={completeEvent} />;
      })}
    </div>
  );
};

export default ProfileEvents; 