import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  CalendarIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import faithImage from "../assets/images/groups/CleanupDrive.jpg";
import { fetchEvents, joinEvent } from '../services/eventService';

interface EventState {
  id: string;
  isJoined: boolean;
  attendees: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
  attendees: Array<{
    id: string;
    name: string;
  }> | number;
  capacity: number;
  organizer: {
    name: string;
    role: string;
  };
}

const Events: React.FC = () => {
  const navigate = useNavigate();
  const [eventStates, setEventStates] = useState<{ [key: string]: EventState }>({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapContainerStyle = {
    width: "100%",
    height: "600px",
  };

  const center = {
    lat: 40.7829,
    lng: -73.9654,
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data);
      
      // Initialize event states with proper typing and validation
      const initialStates = data.reduce((acc: { [key: string]: EventState }, event: Event) => {
        acc[event.id] = {
          id: event.id,
          isJoined: Array.isArray(event.attendees) ? 
            event.attendees.some(attendee => attendee.id === 'current-user-id') : 
            false,
          attendees: Array.isArray(event.attendees) ? 
            event.attendees.length : 
            0
        };
        return acc;
      }, {});
      setEventStates(initialStates);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async (eventId: string) => {
    try {
      await joinEvent(eventId);
      
      // Update local state
      setEventStates(prev => {
        const currentState = prev[eventId];
        return {
          ...prev,
          [eventId]: {
            ...currentState,
            isJoined: !currentState.isJoined,
            attendees: currentState.isJoined 
              ? currentState.attendees - 1 
              : currentState.attendees + 1
          }
        };
      });
    } catch (error) {
      console.error('Failed to join event:', error);
      // Add error handling/notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.div
        className="bg-white shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Community Events
              </h1>
              <p className="text-gray-600 mt-2">
                Discover and join local events happening near you
              </p>
            </div>
            <Link
              to="/communities/events"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Create Event
            </Link>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search events..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="environment">Environment</option>
              <option value="education">Education</option>
              <option value="culture">Culture</option>
              <option value="sports">Sports</option>
            </select>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  viewMode === "map"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setViewMode("map")}
              >
                Map
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Events Display */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-8">
            No events found
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/events/${event.id}`}
                  className="block"
                >
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      <span>
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </Link>

                <div className="px-6 pb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {eventStates[event.id]?.attendees || 
                       (Array.isArray(event.attendees) ? event.attendees.length : 0)} attending
                    </span>
                    <button 
                      onClick={() => handleJoinEvent(event.id)}
                      className={`px-4 py-2 rounded-lg transition-colors text-white font-medium text-sm
                        ${eventStates[event.id]?.isJoined 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-primary-600 hover:bg-primary-700'
                        }`}
                    >
                      {eventStates[event.id]?.isJoined ? 'Joined' : 'Join Event'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;
