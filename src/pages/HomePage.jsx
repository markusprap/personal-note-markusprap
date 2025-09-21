import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';
import { getActiveNotes } from '../utils/local-data';
import NotesList from '../components/NotesList';
import SearchInput from '../components/SearchInput';
import DateFilter from '../components/DateFilter';
import SortToggle from '../components/SortToggle';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const activeNotes = getActiveNotes();
    
    const sortedNotes = activeNotes.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    setAllNotes(sortedNotes);
    
    const filteredNotes = keyword 
      ? sortedNotes.filter(note => 
          note.title.toLowerCase().includes(keyword.toLowerCase())
        )
      : sortedNotes;
    
    setNotes(filteredNotes);
  }, [keyword]);

  const handleDateFilter = (filteredNotes) => {
    const currentAllNotes = allNotes.length > 0 ? allNotes : getActiveNotes();
    
    if (filteredNotes === null) {
      const notesToShow = keyword 
        ? currentAllNotes.filter(note => 
            note.title.toLowerCase().includes(keyword.toLowerCase())
          )
        : currentAllNotes;
      setNotes(notesToShow);
    } else {
      const finalNotes = keyword 
        ? filteredNotes.filter(note => 
            note.title.toLowerCase().includes(keyword.toLowerCase())
          )
        : filteredNotes;
      setNotes(finalNotes);
    }
  };

  const handleSort = (sortedNotes) => {
    setAllNotes(sortedNotes);
    
    const finalNotes = keyword 
      ? sortedNotes.filter(note => 
          note.title.toLowerCase().includes(keyword.toLowerCase())
        )
      : sortedNotes;
    setNotes(finalNotes);
  };

  const handleSearch = (searchKeyword) => {
    if (searchKeyword) {
      setSearchParams({ keyword: searchKeyword });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <FileText size={32} />
          All Notes
        </h1>
        <p className="page-subtitle">
          {notes.length > 0 
            ? `Showing ${notes.length} active note${notes.length > 1 ? 's' : ''}` 
            : 'No active notes found'
          }
        </p>
      </div>

      <SearchInput 
        keyword={keyword}
        onSearch={handleSearch}
        placeholder="Search notes by title..."
      />

      <div className="filter-controls">
        <DateFilter 
          onFilter={handleDateFilter}
          notes={allNotes}
        />
        <SortToggle 
          onSort={handleSort}
          notes={allNotes}
        />
      </div>

      <div className="notes-container">
        {notes.length > 0 ? (
          <NotesList notes={notes} />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FileText size={64} />
            </div>
            <h3>No notes found</h3>
            <p>
              {keyword 
                ? `No notes match "${keyword}". Try a different search term.`
                : "You don't have any active notes yet. Create your first note!"
              }
            </p>
            {!keyword && (
              <div className="empty-actions">
                <p>Use the + button to create your first note</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Link to="/add" className="fab" title="Create new note">
        <Plus size={24} />
      </Link>
    </div>
  );
}

export default HomePage;