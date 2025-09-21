import { useState } from 'react';
import { ArrowUpDown, Calendar, Clock } from 'lucide-react';

function SortToggle({ onSort, notes }) {
  const [sortOrder, setSortOrder] = useState('newest');

  const handleSort = () => {
    const newOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    setSortOrder(newOrder);
    
    const sortedNotes = [...notes].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      if (newOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    onSort(sortedNotes);
  };

  return (
    <button
      className="sort-toggle"
      onClick={handleSort}
      type="button"
      title={`Sort by ${sortOrder === 'newest' ? 'oldest' : 'newest'} first`}
    >
      <ArrowUpDown size={16} />
      <span className="sort-text">
        {sortOrder === 'newest' ? (
          <>
            <Calendar size={14} />
            Newest First
          </>
        ) : (
          <>
            <Clock size={14} />
            Oldest First
          </>
        )}
      </span>
    </button>
  );
}

export default SortToggle;