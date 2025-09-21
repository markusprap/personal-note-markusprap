import { useState } from 'react';
import { ArrowUpDown, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function SortToggle({ onSort, notes }) {
  const { t } = useLanguage();
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
      title={sortOrder === 'newest' ? t('sortByOldest') : t('sortByNewest')}
    >
      <ArrowUpDown size={16} />
      <span className="sort-text">
        {sortOrder === 'newest' ? (
          <>
            <Calendar size={14} />
            {t('newestFirst')}
          </>
        ) : (
          <>
            <Clock size={14} />
            {t('oldestFirst')}
          </>
        )}
      </span>
    </button>
  );
}

export default SortToggle;