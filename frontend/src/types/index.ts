export interface User {
  id: string;
  email?: string;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export const getUserFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  date: string;
  organizer: {
    id: string;
    name: string;
    avatar?: string;
  };
  capacity: number;
  attendees: number;
  attendeeCount: number;
  image?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
  image?: string;
  avatar?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  conversation_id: string;
  createdAt: string;
  sender: User;
}

export interface Notification {
  id: string;
  type: 'message' | 'like' | 'comment' | 'follow' | 'event';
  content: string;
  read: boolean;
  createdAt: string;
  sender?: User;
  relatedId?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
} 