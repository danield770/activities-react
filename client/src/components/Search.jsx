import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { IoIosClose } from 'react-icons/io';
import VisuallyHidden from './VisuallyHidden';

// eslint-disable-next-line react/prop-types
function Search({ activityNames, filterByActivityName }) {
  const [searchText, setSearchText] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  //   console.log({ activityNames });

  function resetSearch() {
    filterByActivityName('');
    setSearchText('');
    setShowSuggestions(false);
  }
  function handleSearchFilter(name) {
    console.log('handleSearchFilter ');
    setSearchText(name);
    filterByActivityName(name);
    setShowSuggestions(false);
  }

  const hasNoResults = React.useMemo(() => {
    if (!showSuggestions) return false;

    // eslint-disable-next-line react/prop-types
    return activityNames.every(
      (name) => !name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const searchResults = React.useMemo(() => {
    if (!showSuggestions) return [];

    // eslint-disable-next-line react/prop-types
    return activityNames.filter((name) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, showSuggestions]);

  console.log({ searchResults });

  return (
    <div>
      <div className='search-wpr'>
        <input
          value={searchText}
          type='text'
          placeholder='Search Timeline'
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          className='search-input'
        />
        {searchText && (
          <button type='button' className='reset-btn' onClick={resetSearch}>
            <IoIosClose size='28' />
            <VisuallyHidden>Reset Search</VisuallyHidden>
          </button>
        )}
        <button
          type='button'
          className='search-btn'
          onClick={() => filterByActivityName(searchText)}
          disabled={!searchText || hasNoResults}
        >
          <IoSearch size='28' />
          <VisuallyHidden>Search Activities</VisuallyHidden>
        </button>
      </div>
      {hasNoResults ? (
        <div className='no-results'>No results found</div>
      ) : (
        <ul className='search-results'>
          {searchResults.map((name) => (
            <li key={name}>
              {' '}
              <button
                className='search-result'
                onMouseDown={() => handleSearchFilter(name)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Search;
