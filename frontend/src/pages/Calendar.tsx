import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  type: 'community' | 'personal';
}

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Mock data - replace with actual API call
  const events: Event[] = [
    {
      id: '1',
      title: 'Community Meetup',
      description: 'Monthly community gathering',
      date: new Date(),
      time: '14:00',
      location: 'Community Center',
      type: 'community'
    },
    {
      id: '2',
      title: 'Project Planning',
      description: 'Planning session for new initiative',
      date: new Date(),
      time: '16:00',
      location: 'Virtual Meeting',
      type: 'personal'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <div className="flex space-x-4">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as 'month' | 'week' | 'day')}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
            Add Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Calendar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ←
            </button>
            <h2 className="text-xl font-semibold">
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              →
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {getDaysInMonth(selectedDate).map((date) => (
            <div
              key={date.toISOString()}
              className={`bg-white p-2 h-32 ${
                date.toDateString() === new Date().toDateString()
                  ? 'bg-primary-50'
                  : ''
              }`}
            >
              <div className="font-medium text-sm text-gray-900">{date.getDate()}</div>
              {events
                .filter(
                  (event) =>
                    event.date.toDateString() === date.toDateString()
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className={`mt-1 p-1 text-xs rounded ${
                      event.type === 'community'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-2" />
                    {event.date.toLocaleDateString()}
                    <FaClock className="ml-4 mr-2" />
                    {event.time}
                    <FaMapMarkerAlt className="ml-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.type === 'community'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {event.type === 'community' ? 'Community' : 'Personal'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar; 