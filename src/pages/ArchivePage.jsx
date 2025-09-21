import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Archive, Plus, FileText, Info } from 'lucide-react';
import { getArchivedNotes } from '../utils/local-data';
import NotesList from '../components/NotesList';
import SearchInput from '../components/SearchInput';
import DateFilter from '../components/DateFilter';
import SortToggle from '../components/SortToggle';

function ArchivePage() {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';



  useEffect(() => {
    const archivedNotes = getArchivedNotes();
    
    const sortedNotes = archivedNotes.sort((a, b) => {
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

  useEffect(() => {
    const archivedNotes = getArchivedNotes();
    
    const sortedNotes = archivedNotes.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    setAllNotes(sortedNotes);
    setNotes(sortedNotes);
  }, []);

  const handleDateFilter = (filteredNotes) => {
    const currentAllNotes = allNotes.length > 0 ? allNotes : getArchivedNotes();
    
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

  const handleSearch = (searchKeyword) => {
    if (searchKeyword) {
      setSearchParams({ keyword: searchKeyword });
    } else {
      setSearchParams({});
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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <Archive size={32} />
          Archived Notes
        </h1>
        <p className="page-subtitle">
          {notes.length > 0 
            ? `Showing ${notes.length} archived note${notes.length > 1 ? 's' : ''}` 
            : 'No archived notes found'
          }
        </p>
      </div>

      <SearchInput 
        keyword={keyword}
        onSearch={handleSearch}
        placeholder="Search archived notes by title..."
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
          <NotesList notes={notes} showArchiveButtons={true} />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Archive size={64} />
            </div>
            <h3>Archive is empty</h3>
            <p>
              {keyword 
                ? `No archived notes match "${keyword}". Try a different search term.`
                : "You don't have any archived notes yet. Archive notes to organize your workspace!"
              }
            </p>
            <div className="empty-actions">
              <Link to="/" className="btn btn-outline">
                <FileText size={16} />
                <span>View Active Notes</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {notes.length > 0 && (
        <div className="archive-info">
          <div className="info-card">
            <h3>
              <Info size={20} />
              About Archives
            </h3>
            <p>Archived notes are hidden from your main workspace but still accessible here. You can:</p>
            <ul>
              <li>🔍 Search through archived notes</li>
              <li>📖 Read archived note details</li>
              <li>📤 Unarchive notes to make them active again</li>
              <li>🗑️ Permanently delete notes you no longer need</li>
            </ul>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <Link to="/add" className="fab" title="Create new note">
        <Plus size={24} />
      </Link>
    </div>
  );
}

export default ArchivePage;