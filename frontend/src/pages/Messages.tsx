import React, { useState, useEffect } from "react";
import { useLocation, Location } from "react-router-dom";
import ConversationsList from "../components/features/messages/ConversationsList";
import MessageThread from "../components/features/messages/MessageThread";
import { Conversation } from "../types/chat";
import { useAppDispatch } from "../store/hooks";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface LocationState {
  sellerName: string;
}

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const locationState = location.state as LocationState;
  
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
        setLoading(false);
      }
    };

    fetchConversations();
  }, [dispatch]);

  useEffect(() => {
    if (locationState?.sellerName) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        name: locationState.sellerName,
        participants: [locationState.sellerName],
        messages: [],
        lastMessage: undefined,
        unreadCount: 0,
        isGroup: false,
        status: 'online',
        time: new Date().toLocaleTimeString()
      };
      setConversations((prev) => [...prev, newConversation]);
      setSelectedConversation(newConversation);
    }
  }, [locationState]);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="flex flex-col h-screen bg-[#111b21]">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-3">
        <h1 className="text-xl font-semibold text-white mb-4">Direct Messages</h1>
        
        {/* Filters and Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {['All', 'Unread', 'Groups'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter.toLowerCase())}
                className={`text-sm ${
                  activeFilter === filter.toLowerCase()
                    ? 'text-white font-medium'
                    : 'text-primary-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Search chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-black text-sm px-4 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {selectedConversation ? (
          <MessageThread conversation={selectedConversation} />
        ) : (
          <ConversationsList
            conversations={conversations}
            onSelectConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
            searchQuery={searchQuery}
          />
        )}
      </div>

      {/* Add Chat Button */}
      {!selectedConversation && (
        <button className="absolute right-4 bottom-2 bg-primary-600 p-3.5 rounded-full shadow-lg hover:bg-primary-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {/* Footer */}
      <div className="bg-[#111b21] flex justify-around items-center py-3 border-t border-gray-700">
        <button
          onClick={() => setActiveTab('chats')}
          className={`flex flex-col items-center ${
            activeTab === 'chats' ? 'text-primary-600' : 'text-gray-400'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-1">
            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">Chats</span>
        </button>
        <button
          onClick={() => setActiveTab('communities')}
          className={`flex flex-col items-center ${
            activeTab === 'communities' ? 'text-primary-600' : 'text-gray-400'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-1">
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
          </svg>
          <span className="text-xs">Communities</span>
        </button>
      </div>
    </div>
  );
};

export default Messages;