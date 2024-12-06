import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import EventCard from '../events/EventCard';
import GroupCard from '../groups/GroupCard';
import UserCard from '../../users/UserCard';
import { SearchType } from '../../../types/search';

interface SearchResultsProps {
  query: string;
  type: SearchType;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, type }) => {
  const { results, loading } = useAppSelector((state) => state.search);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-8 text-gray-500">
        Enter a search term to begin
      </div>
    );
  }

  const renderResults = () => {
    switch (type) {
      case 'users':
        return (
          <div className="grid gap-4">
            {results.users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        );
      case 'events':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        );
      case 'groups':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.groups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        );
      case 'all':
        return (
          <div className="space-y-8">
            {results.users.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-4">People</h3>
                <div className="grid gap-4">
                  {results.users.slice(0, 3).map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </section>
            )}
            {results.events.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-4">Events</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.events.slice(0, 3).map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}
            {results.groups.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-4">Groups</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.groups.slice(0, 3).map(group => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>
              </section>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-4">
      {renderResults()}
      {type !== 'all' && Object.values(results).every(arr => arr.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchResults; 