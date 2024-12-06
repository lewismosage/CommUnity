import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEvents } from '../../store/slices/eventSlice';
import EventCard from './events/EventCard';
import LoadingSpinner from '../common/LoadingSpinner';

const EventsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading } = useAppSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No events found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList; 