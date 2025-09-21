import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

function SearchInput({ keyword, onSearch, placeholder = "Search..." }) {
  const [searchTerm, setSearchTerm] = useState(keyword);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <button 
            className="search-clear-btn"
            onClick={handleClear}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="search-info">
          Searching for: <strong>"{searchTerm}"</strong>
        </div>
      )}
    </div>
  );
}

export default SearchInput;