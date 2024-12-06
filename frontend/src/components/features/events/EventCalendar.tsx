import React, { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Event } from '../../../types';
import { formatDate } from '../../../utils/dateUtils';

const EventCalendar: React.FC = () => {
  const { events } = useAppSelector((state) => state.events);
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add padding for days from previous month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 rounded-md bg-primary-100 text-primary-700 hover:bg-primary-200"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="grid grid-cols-7 gap-px">
          {weekDays.map(day => (
            <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[120px] bg-white ${
                day?.toDateString() === new Date().toDateString()
                  ? 'bg-primary-50'
                  : ''
              }`}
            >
              {day && (
                <div className="p-2">
                  <div className="text-sm font-medium text-gray-500">
                    {day.getDate()}
                  </div>
                  <div className="mt-1 space-y-1">
                    {getEventsForDate(day).map(event => (
                      <div
                        key={event.id}
                        className="px-2 py-1 text-xs rounded-md bg-primary-100 text-primary-700 truncate"
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar; 