import React from 'react';
import { CreateEventModal } from './CreateEventModal';
import { EventDetails, EventFormData } from '../../../types/event';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: EventFormData) => void;
  eventData: EventDetails;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  eventData
}) => {
  const initialFormData: EventFormData = {
    title: eventData.title,
    description: eventData.description,
    date: eventData.date,
    time: eventData.time,
    endTime: '',
    location: eventData.location,
    category: eventData.type,
    capacity: eventData.capacity,
    organizer: {
      name: eventData.organizer.name,
      role: eventData.organizer.role
    },
    agenda: eventData.agenda || [],
    requirements: eventData.requirements || []
  };

  return (
    <CreateEventModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={initialFormData}
      mode="edit"
    />
  );
};

export default EditEventModal; 