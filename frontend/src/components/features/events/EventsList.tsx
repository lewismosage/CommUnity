import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchEvents } from '../../../store/slices/eventSlice';
import EventCard from './EventCard';
import type { RootState } from '../../../store/store';

const EventsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList; 