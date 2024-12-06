import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { search } from '../../../store/slices/searchSlice';
import { SearchType } from '../../../types/search';

interface SearchProps {
  query: string;
  activeTab: SearchType;
}

const Search: React.FC<SearchProps> = ({ query: debouncedQuery, activeTab }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(search({ 
        query: debouncedQuery, 
        type: activeTab === 'all' ? undefined : activeTab 
      }));
    }
  }, [dispatch, debouncedQuery, activeTab]);

  return null;
};

export default Search; 