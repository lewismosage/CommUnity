import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { search, clearResults } from '../store/slices/searchSlice';
import { SearchType } from '../types/search';
import useDebounce from './useDebounce';

export const useSearch = (initialType: SearchType = 'all') => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>(initialType);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useAppDispatch();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      const performSearch = async () => {
        setIsSearching(true);
        try {
          await dispatch(search({ 
            query: debouncedQuery, 
            type: searchType === 'all' ? undefined : searchType 
          })).unwrap();
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsSearching(false);
        }
      };

      performSearch();
    } else {
      dispatch(clearResults());
    }
  }, [debouncedQuery, searchType, dispatch]);

  return {
    query,
    setQuery,
    searchType,
    setSearchType,
    isSearching,
  };
};

export default useSearch; 