import api from '../utils/axios';
import { EventFormData } from '../types/event';

export const fetchEvents = async () => {
    try {
        const response = await api.get('/api/events');
        const events = response.data.map((event: any) => ({
            ...event,
            attendees: Array.isArray(event.attendees) ? event.attendees : [],
        }));
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export const createEvent = async (eventData: EventFormData) => {
    try {
        const response = await api.post('/api/events', eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

export const joinEvent = async (eventId: string) => {
    try {
        const response = await api.post(`/api/events/${eventId}/join`);
        return response.data;
    } catch (error) {
        console.error('Error joining event:', error);
        throw error;
    }
}; 