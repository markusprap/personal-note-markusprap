import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Archive, Plus, FileText, Info, Loader } from 'lucide-react';
import { getArchivedNotes } from '../utils/network-data';
import { formatTranslation } from '../utils';
import { useLanguage } from '../contexts/LanguageContext';
import NotesList from '../components/NotesList';
import SearchInput from '../components/SearchInput';
import DateFilter from '../components/DateFilter';
import SortToggle from '../components/SortToggle';

function ArchivePage() {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { t } = useLanguage();

  useEffect(() => {
    const loadArchivedNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { error: apiError, data } = await getArchivedNotes();
        
        if (apiError || !data) {
          throw new Error('Failed to load archived notes');
        }
        
        const sortedNotes = data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        setAllNotes(sortedNotes);
        
        const filteredNotes = keyword 
          ? sortedNotes.filter(note => 
              note.title.toLowerCase().includes(keyword.toLowerCase()) ||
              note.body.toLowerCase().includes(keyword.toLowerCase())
            )
          : sortedNotes;
        
        setNotes(filteredNotes);
      } catch (err) {
        console.error('Error loading archived notes:', err);
        setError(err.message || 'Failed to load archived notes');
        setNotes([]);
        setAllNotes([]);
      } finally {
        setLoading(false);
      }
    };

    loadArchivedNotes();
  }, [keyword]);

  const handleDateFilter = (filteredNotes) => {
    const currentAllNotes = allNotes;
    
    if (filteredNotes === null) {
      const notesToShow = keyword 
        ? currentAllNotes.filter(note => 
            note.title.toLowerCase().includes(keyword.toLowerCase()) ||
            note.body.toLowerCase().includes(keyword.toLowerCase())
          )
        : currentAllNotes;
      setNotes(notesToShow);
    } else {
      const finalNotes = keyword 
        ? filteredNotes.filter(note => 
            note.title.toLowerCase().includes(keyword.toLowerCase()) ||
            note.body.toLowerCase().includes(keyword.toLowerCase())
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
          note.title.toLowerCase().includes(keyword.toLowerCase()) ||
          note.body.toLowerCase().includes(keyword.toLowerCase())
        )
      : sortedNotes;
    setNotes(finalNotes);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <Archive size={32} />
          {t('archives')}
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
        placeholder={t('searchArchived')}
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
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner">
              <Loader className="spin" size={48} />
            </div>
            <p>{t('loadingArchivedNotes')}</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">
              <Archive size={64} />
            </div>
            <h2>{t('errorLoadingArchivedNotes')}</h2>
            <p>{error}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => window.location.reload()}
            >
              {t('tryAgain')}
            </button>
          </div>
        ) : notes.length > 0 ? (
          <NotesList notes={notes} showArchiveButtons={true} />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Archive size={64} />
            </div>
            <h3>{t('archiveEmpty')}</h3>
            <p>
              {keyword 
                ? formatTranslation(t('noArchivedNotesMatchSearch'), { keyword })
                : t('noArchivedNotes')
              }
            </p>
            <div className="empty-actions">
              <Link to="/" className="btn btn-outline">
                <FileText size={16} />
                <span>{t('viewActiveNotes')}</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Link to="/add" className="fab" title={t('createNewNote')}>
        <Plus size={24} />
      </Link>
    </div>
  );
}

export default ArchivePage;