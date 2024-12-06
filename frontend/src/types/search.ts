import { User, Event, Group } from './index';

export type SearchType = 'events' | 'groups' | 'users' | 'all';

export interface SearchState {
  type: SearchType;
  query: string;
  results: {
    users: User[];
    events: Event[];
    groups: Group[];
  };
  loading: boolean;
  error: string | null;
} 