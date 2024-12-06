import { User } from './user';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount?: number;
  isGroup?: boolean;
  status?: string;
  time?: string;
} 