import React from 'react';
import { Event } from '../../../types';
import { formatDateRange } from '../../../utils/dateUtils';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {formatDateRange(event.startDate, event.endDate)}
        </p>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {event.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {event.location}
          </span>
          <span className="text-sm text-gray-500">
            {event.attendeeCount || event.attendees} attending
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 