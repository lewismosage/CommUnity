import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../../hooks/useSearch';
import { useAppSelector } from '../../../store/hooks';
import { getUserFullName } from '../../../types';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { query, setQuery, searchType, setSearchType, isSearching } = useSearch();
  const { results } = useAppSelector((state) => state.search);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}&type=${searchType}`);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, groups, or users..."
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as any)}
          className="ml-2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All</option>
          <option value="events">Events</option>
          <option value="groups">Groups</option>
          <option value="users">Users</option>
        </select>
      </form>

      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {results.events.length > 0 && (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Events</h3>
                  {results.events.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="py-2 cursor-pointer hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.location}</p>
                    </div>
                  ))}
                </div>
              )}

              {results.groups.length > 0 && (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Groups</h3>
                  {results.groups.slice(0, 3).map((group) => (
                    <div
                      key={group.id}
                      onClick={() => navigate(`/groups/${group.id}`)}
                      className="py-2 cursor-pointer hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-900">{group.name}</p>
                      <p className="text-sm text-gray-500">{group.memberCount} members</p>
                    </div>
                  ))}
                </div>
              )}

              {results.users.length > 0 && (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Users</h3>
                  {results.users.slice(0, 3).map((user) => (
                    <div
                      key={user.id}
                      onClick={() => navigate(`/profile/${user.id}`)}
                      className="py-2 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <img
                          src={user.avatar || 'https://via.placeholder.com/40'}
                          alt={getUserFullName(user)}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{getUserFullName(user)}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!results.events.length && !results.groups.length && !results.users.length && (
                <div className="p-4 text-center text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 