import React from 'react';
import { Conversation, Message } from '../../../types/chat';

interface MessageThreadProps {
  conversation: Conversation;
}

const MessageThread: React.FC<MessageThreadProps> = ({ conversation }) => {
  return (
    <div className="flex flex-col h-full bg-[#0b141a]">
      {/* Header */}
      <div className="bg-[#202c33] px-4 py-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center text-xl mr-3">
            {conversation.avatar || conversation.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-white font-medium">{conversation.name}</h3>
            <span className="text-xs text-[#8696a0]">
              {conversation.isGroup 
                ? `${conversation.participants.length} participants` 
                : (conversation.status || 'online')}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === conversation.id
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[65%] rounded-lg px-4 py-2 shadow ${
                message.senderId === conversation.id
                  ? 'bg-[#d9fdd3]'
                  : 'bg-white'
              }`}
            >
              <p className="text-[#111b21]">{message.content}</p>
              <span className="text-[11px] text-gray-500 float-right mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-[#202c33] p-3">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full bg-[#2a3942] text-white rounded-lg px-4 py-2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default MessageThread; 