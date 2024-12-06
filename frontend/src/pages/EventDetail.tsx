import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEventById, attendEvent } from '../store/slices/eventSlice';
import { formatDateRange } from '../utils/dateUtils';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentEvent, loading } = useAppSelector((state) => state.events);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);

  const handleAttend = async () => {
    if (id) {
      try {
        await dispatch(attendEvent(id)).unwrap();
      } catch (error) {
        console.error('Failed to attend event:', error);
      }
    }
  };

  if (loading || !currentEvent) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img
          src={currentEvent.image || 'https://via.placeholder.com/1200x400'}
          alt={currentEvent.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900">{currentEvent.title}</h1>
          
          <div className="mt-4 flex items-center text-gray-500">
            <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDateRange(currentEvent.startDate, currentEvent.endDate)}
          </div>

          <div className="mt-2 flex items-center text-gray-500">
            <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {currentEvent.location}
          </div>

          <div className="mt-6 prose prose-sm max-w-none">
            {currentEvent.description}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={currentEvent.organizer.avatar || 'https://via.placeholder.com/40'}
                alt={currentEvent.organizer.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Organized by {currentEvent.organizer.name}
                </p>
                <p className="text-sm text-gray-500">
                  {currentEvent.attendeeCount || currentEvent.attendees} attending
                </p>
              </div>
            </div>

            <button
              onClick={handleAttend}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Attend Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail; 