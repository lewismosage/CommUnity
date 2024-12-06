import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaShare, FaCalendarPlus, FaEdit, FaTrash } from 'react-icons/fa';
import EditEventModal from '../components/features/events/EditEventModal';
import { EventDetails, EventFormData } from '../types/event';

interface CalendarEvent {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

const formatGoogleCalendarUrl = (event: CalendarEvent) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${event.startDate}/${event.endDate}`.replace(/[-:]/g, ''),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
};

const formatICalDate = (date: string, time: string) => {
  const dt = new Date(`${date}T${time}`);
  return dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

export const EventDetailsPage: React.FC = () => {
  const { id, eventId } = useParams<{ id: string; eventId: string }>();
  const [isAttending, setIsAttending] = useState(false);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  // Mock data - replace with API call
  const event: EventDetails = {
    id: eventId || '',
    title: 'Weekend Beach Cleanup',
    description: 'Join us for our monthly beach cleanup initiative. Together, we can make a difference in keeping our beaches clean and safe for everyone. All cleaning supplies will be provided. Don\'t forget to bring water and wear comfortable clothes!',
    date: '2024-03-20',
    time: '09:00',
    location: 'Mombasa Beach, Near Lighthouse',
    community: {
      id: '1',
      name: 'Green Earth Initiative',
    },
    type: 'cleanup',
    attendees: 45,
    capacity: 100,
    status: 'upcoming',
    organizer: {
      name: 'Sarah Johnson',
      role: 'Environmental Coordinator',
      avatar: 'https://example.com/avatar.jpg'
    },
    agenda: [
      '8:30 AM - Registration and Equipment Distribution',
      '9:00 AM - Safety Briefing',
      '9:15 AM - Begin Cleanup Activities',
      '11:30 AM - Break and Refreshments',
      '12:00 PM - Continue Cleanup',
      '1:30 PM - Wrap-up and Final Collection',
      '2:00 PM - Closing Remarks and Thank You'
    ],
    requirements: [
      'Comfortable clothes and closed shoes',
      'Water bottle',
      'Sun protection (hat, sunscreen)',
      'Signed waiver form (provided at registration)'
    ]
  };

  const handleAttendance = () => {
    // TODO: Implement API call to handle attendance
    setIsAttending(!isAttending);
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    navigator.share?.({
      title: event.title,
      text: event.description,
      url: window.location.href
    }).catch(console.error);
  };

  const handleAddToCalendar = (type: 'google' | 'ical' | 'outlook') => {
    const startDateTime = formatICalDate(event.date, event.time);
    // Assume event duration is 2 hours if not specified
    const endDateTime = formatICalDate(event.date, 
      new Date(`${event.date}T${event.time}`).getHours() + 2 + ':00');

    const calendarEvent: CalendarEvent = {
      title: event.title,
      description: event.description,
      startDate: startDateTime,
      endDate: endDateTime,
      location: event.location,
    };

    switch (type) {
      case 'google':
        window.open(formatGoogleCalendarUrl(calendarEvent), '_blank');
        break;
      case 'ical':
        // Implementation for iCal download
        // You might want to use a library like ics.js for this
        break;
      case 'outlook':
        // Implementation for Outlook.com calendar
        // Similar to Google Calendar format
        break;
    }
    setShowCalendarOptions(false);
  };

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // TODO: Implement API call to delete event
        console.log('Deleting event:', id);
        navigate('/communities/events');
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const handleEditEvent = (updatedEventData: EventFormData) => {
    // TODO: Implement API call to update event
    console.log('Updating event:', updatedEventData);
    setShowEditModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Event Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
            <Link 
              to={`/communities/${event.community.id}`}
              className="text-primary-600 hover:text-primary-700"
            >
              {event.community.name}
            </Link>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${event.type === 'cleanup' ? 'bg-green-100 text-green-800' :
              event.type === 'sports' ? 'bg-blue-100 text-blue-800' :
              event.type === 'fundraising' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'}`}
          >
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center text-gray-600">
            <FaCalendar className="mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaClock className="mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <FaUsers className="mr-2" />
              <span>{event.attendees} / {event.capacity} attending</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowCalendarOptions(!showCalendarOptions)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaCalendarPlus className="mr-2" />
                Add to Calendar
              </button>
              
              {/* Calendar Options Dropdown */}
              {showCalendarOptions && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu">
                    <button
                      onClick={() => handleAddToCalendar('google')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Google Calendar
                    </button>
                    <button
                      onClick={() => handleAddToCalendar('ical')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      iCal / Apple Calendar
                    </button>
                    <button
                      onClick={() => handleAddToCalendar('outlook')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Outlook Calendar
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FaShare className="mr-2" />
              Share
            </button>
            <div className="space-x-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 text-white rounded-lg hover:bg-primary-700 bg-primary-600 
                  md:inline-flex md:items-center
                  hidden md:block" // Hide full button on mobile
              >
                Edit Event
              </button>
              <button
                onClick={() => setShowEditModal(true)}
                className="p-2 text-white rounded-lg hover:bg-primary-700 bg-primary-600 md:hidden"
                aria-label="Edit Event"
              >
                <FaEdit className="h-5 w-5" />
              </button>

              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 text-white rounded-lg hover:bg-red-700 bg-red-600
                  md:inline-flex md:items-center
                  hidden md:block" // Hide full button on mobile
              >
                Delete Event
              </button>
              <button
                onClick={handleDeleteEvent}
                className="p-2 text-white rounded-lg hover:bg-red-700 bg-red-600 md:hidden"
                aria-label="Delete Event"
              >
                <FaTrash className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About this Event</h2>
            <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
          </div>

          {/* Agenda */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Agenda</h2>
            <ul className="space-y-3">
              {event.agenda?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 mt-2 rounded-full bg-primary-600 mr-3"></span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Organizer */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Organizer</h2>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {event.organizer.name[0]}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{event.organizer.name}</h3>
                <p className="text-sm text-gray-500">{event.organizer.role}</p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What to Bring</h2>
            <ul className="space-y-3">
              {event.requirements?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 mt-2 rounded-full bg-primary-600 mr-3"></span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add EditEventModal */}
      <EditEventModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditEvent}
        eventData={event}
      />
    </div>
  );
};

export default EventDetailsPage; 