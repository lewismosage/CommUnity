export interface EventDetails {
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
  organizer: {
    name: string;
    role: string;
    avatar?: string;
  };
  agenda?: string[];
  requirements?: string[];
  images?: string[];
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  category: string;
  capacity: number;
  image?: File;
  organizer: {
    name: string;
    role: string;
  };
  agenda: string[];
  requirements: string[];
} 