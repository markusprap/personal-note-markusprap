import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FileText, Plus, Loader } from 'lucide-react';
import { getActiveNotes } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';
import { formatTranslation } from '../utils';
import NotesList from '../components/NotesList';
import SearchInput from '../components/SearchInput';
import DateFilter from '../components/DateFilter';
import SortToggle from '../components/SortToggle';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { t } = useLanguage();

  useEffect(() => {
    const loadActiveNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { error: apiError, data } = await getActiveNotes();
        
        if (apiError || !data) {
          throw new Error('Failed to load notes');
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
        console.error('Error loading notes:', err);
        setError(err.message || 'Failed to load notes');
        setNotes([]);
        setAllNotes([]);
      } finally {
        setLoading(false);
      }
    };

    loadActiveNotes();
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
          {t('allNotes')}
        </h1>
        <p className="page-subtitle">
          {notes.length > 0 
            ? formatTranslation(t('showingActiveNotes'), { count: notes.length })
            : t('noActiveNotesFound')
          }
        </p>
      </div>

      <SearchInput 
        keyword={keyword}
        onSearch={handleSearch}
        placeholder={t('searchNotes')}
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
            <p>{t('loadingNotes')}</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">
              <FileText size={64} />
            </div>
            <h2>{t('errorLoadingNotes')}</h2>
            <p>{error}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : notes.length > 0 ? (
          <NotesList notes={notes} />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FileText size={64} />
            </div>
            <h3>{t('noNotesFound')}</h3>
            <p>
              {keyword 
                ? formatTranslation(t('noNotesMatchSearch'), { keyword })
                : t('noActiveNotes')
              }
            </p>
            {!keyword && (
              <div className="empty-actions">
                <p>{t('useAddButton')}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Link to="/add" className="fab" title={t('createNewNote')}>
        <Plus size={24} />
      </Link>
    </div>
  );
}

export default HomePage;