import { Socket as ClientSocket, connect } from 'socket.io-client';
import { store } from '../store/store';
import { addMessage } from '../store/slices/messageSlice';
import { addNotification } from '../store/slices/notificationSlice';
import { API_URL } from '../config';
import { Message, Notification } from '../types';

interface TypingData {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

class WebSocketService {
  private socket: ReturnType<typeof connect> | null = null;
  private token: string | null = null;

  constructor() {
    this.socket = null;
    this.token = null;
  }

  connect(token: string) {
    this.token = token;
    this.socket = connect(API_URL, {
      auth: {
        token,
      },
    });

    this.setupEventListeners();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.token = null;
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('new_message', (message: Message) => {
      store.dispatch(addMessage(message));
    });

    this.socket.on('new_notification', (notification: Notification) => {
      store.dispatch(addNotification(notification));
    });

    this.socket.on('user_typing', (data: TypingData) => {
      // Handle typing indicator
      console.log('User typing:', data);
    });

    this.socket.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  }

  sendMessage(conversationId: string, content: string) {
    if (this.socket) {
      this.socket.emit('send_message', { conversationId, content });
    }
  }

  startTyping(conversationId: string) {
    if (this.socket) {
      this.socket.emit('typing_start', { conversationId });
    }
  }

  stopTyping(conversationId: string) {
    if (this.socket) {
      this.socket.emit('typing_stop', { conversationId });
    }
  }
}

export const websocketService = new WebSocketService();
export default websocketService; 