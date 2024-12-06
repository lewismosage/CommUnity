import React, { createContext, useContext, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import websocketService from '../services/websocketService';

interface WebSocketContextType {
  sendMessage: (conversationId: string, content: string) => void;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      websocketService.connect(token);
    } else {
      websocketService.disconnect();
    }
  }, [token]);

  const value = {
    sendMessage: (conversationId: string, content: string) => 
      websocketService.sendMessage(conversationId, content),
    startTyping: (conversationId: string) => 
      websocketService.startTyping(conversationId),
    stopTyping: (conversationId: string) => 
      websocketService.stopTyping(conversationId),
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}; 