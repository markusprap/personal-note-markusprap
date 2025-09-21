import { useState } from 'react';
import { Calendar, X } from 'lucide-react';

function DateFilter({ onFilter, notes }) {
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleFilter = () => {
    if (!startDate && !endDate) {
      onFilter(null);
      setIsFilterActive(false);
      return;
    }

    const filteredNotes = notes.filter(note => {
      const noteDate = new Date(note.createdAt);
      
      const start = startDate ? new Date(startDate + 'T00:00:00.000Z') : null;
      const end = endDate ? new Date(endDate + 'T23:59:59.999Z') : null;

      if (start && end) {
        return noteDate >= start && noteDate <= end;
      } else if (start) {
        return noteDate >= start;
      } else if (end) {
        return noteDate <= end;
      }
      
      return true;
    });

    setIsFilterActive(true);
    onFilter(filteredNotes);
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setIsFilterActive(false);
    onFilter(null);
    setShowFilter(false);
  };

  return (
    <div className="date-filter">
      <button
        className={`date-filter-toggle ${isFilterActive ? 'active' : ''}`}
        onClick={() => setShowFilter(!showFilter)}
        type="button"
      >
        <Calendar size={20} />
        Filter by Date
        {isFilterActive && <span className="active-indicator">●</span>}
      </button>

      {showFilter && (
        <div className="date-filter-panel">
          <div className="date-filter-inputs">
            <div className="date-input-group">
              <label htmlFor="startDate">From Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="date-input-group">
              <label htmlFor="endDate">To Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || undefined}
              />
            </div>
          </div>

          <div className="date-filter-actions">
            <button
              type="button"
              onClick={handleFilter}
              className="btn-primary"
            >
              Apply Filter
            </button>
            
            <button
              type="button"
              onClick={clearFilter}
              className="btn-secondary"
            >
              <X size={16} />
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateFilter;