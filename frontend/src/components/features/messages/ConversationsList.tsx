import React from 'react';
import { Conversation } from '../../../types/chat';

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  searchQuery: string;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  searchQuery,
}) => {
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto">
      {filteredConversations.map((conv) => (
        <div
          key={conv.id}
          onClick={() => onSelectConversation(conv)}
          className={`px-4 py-3 cursor-pointer hover:bg-[#202c33] ${
            selectedConversation?.id === conv.id ? 'bg-[#2a3942]' : ''
          }`}
        >
          <div
            className="flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#6a7175] flex items-center justify-center text-xl mr-3">
              {conv.avatar || conv.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-white font-medium truncate">{conv.name}</h3>
                {conv.time && (
                  <span className="text-xs text-[#8696a0] ml-2">{conv.time}</span>
                )}
              </div>
              {conv.lastMessage && (
                <p className="text-[#8696a0] text-sm truncate">
                  {conv.lastMessage.content}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationsList; 