import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarPlus, FaUsers, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import CreateEventModal from '../components/features/events/CreateEventModal';
import { EventFormData } from '../types/event';

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  community: {
    id: string;
    name: string;
    image?: string;
  };
  type: 'cleanup' | 'fundraising' | 'sports' | 'meetup' | 'other';
  attendees: number;
  capacity: number;
  status: 'upcoming' | 'ongoing' | 'past';
}

export const CommunityEvents: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const events: CommunityEvent[] = [
    {
      id: '1',
      title: 'Weekend Beach Cleanup',
      description: 'Join us for our monthly beach cleanup initiative. All cleaning supplies will be provided.',
      date: '2024-03-20',
      time: '09:00',
      location: 'Mombasa Beach',
      community: {
        id: '1',
        name: 'Green Earth Initiative',
      },
      type: 'cleanup',
      attendees: 45,
      capacity: 100,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Community Football Tournament',
      description: 'Annual football tournament between community teams. All skill levels welcome!',
      date: '2024-03-25',
      time: '14:00',
      location: 'Community Sports Ground',
      community: {
        id: '2',
        name: 'Sports & Recreation Club',
      },
      type: 'sports',
      attendees: 75,
      capacity: 150,
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Education Fund Fundraiser',
      description: 'Fundraising event to support local students with school supplies and scholarships.',
      date: '2024-03-30',
      time: '18:00',
      location: 'Community Center',
      community: {
        id: '3',
        name: 'Education Support Network',
      },
      type: 'fundraising',
      attendees: 120,
      capacity: 200,
      status: 'upcoming'
    }
  ];

  const getEventTypeColor = (type: CommunityEvent['type']) => {
    switch (type) {
      case 'cleanup':
        return 'bg-green-100 text-green-800';
      case 'sports':
        return 'bg-blue-100 text-blue-800';
      case 'fundraising':
        return 'bg-purple-100 text-purple-800';
      case 'meetup':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateEvent = (eventData: EventFormData) => {
    // TODO: Implement API call to create event
    console.log('Creating event:', eventData);

    // Convert category to valid event type
    const getEventType = (category: string): CommunityEvent['type'] => {
      const normalizedCategory = category.toLowerCase();
      switch (normalizedCategory) {
        case 'cleanup':
          return 'cleanup';
        case 'fundraising':
          return 'fundraising';
        case 'sports':
          return 'sports';
        case 'meetup':
          return 'meetup';
        default:
          return 'other';
      }
    };

    // Mock adding the new event
    const newEvent: CommunityEvent = {
      id: String(events.length + 1),
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      community: {
        id: '1',
        name: 'Your Community'
      },
      type: getEventType(eventData.category),  // Convert category to valid type
      attendees: 0,
      capacity: eventData.capacity,
      status: 'upcoming'
    };

    // Add to events list
    events.push(newEvent);

    // Navigate or show success message
    navigate('/events');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Events</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <FaCalendarPlus className="mr-2" />
          Create Event
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">by {event.community.name}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {event.attendees} / {event.capacity} attending
                  </span>
                  <Link
                    to={`/communities/${event.community.id}/events/${event.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <FaCalendarPlus className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No events yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
          <div className="mt-6">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <FaCalendarPlus className="mr-2" />
              Create Event
            </button>
          </div>
        </div>
      )}

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default CommunityEvents; 