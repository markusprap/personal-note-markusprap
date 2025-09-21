import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Hash, 
  Archive, 
  ArchiveRestore, 
  Trash2, 
  FileText, 
  Plus, 
  Loader,
  AlertCircle 
} from 'lucide-react';
import parser from 'html-react-parser';
import { getNote, archiveNote, unarchiveNote, deleteNote } from '../utils/network-data';
import { formatTranslation } from '../utils';
import { useDialog } from '../contexts/DialogContext';
import { useLanguage } from '../contexts/LanguageContext';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { confirm, success, error: errorDialog } = useDialog();
  const { t } = useLanguage();

  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true);
        
        const { error, data } = await getNote(id);
        
        if (!error && data) {
          setNote(data);
        } else {
          setNote(null);
        }
      } catch (err) {
        console.error('Error loading note:', err);
        setNote(null);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleDelete = async () => {
    const confirmed = await confirm(
      t('confirmDeleteNote'),
      t('deleteNote')
    );

    if (confirmed) {
      try {
        setIsDeleting(true);
        const { error: apiError } = await deleteNote(id);
        
        if (apiError) {
          throw new Error('Failed to delete note');
        }
        
        success(t('noteDeleted'));
        setTimeout(() => navigate('/'), 1500);
      } catch (err) {
        error(err.message || t('failedToDeleteNote'));
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleArchiveToggle = async () => {
    const action = note.archived ? 'unarchive' : 'archive';
    const confirmed = await confirm(
      formatTranslation(t('confirmArchiveNote'), { action }),
      `${action.charAt(0).toUpperCase() + action.slice(1)} ${t('note')}`
    );

    if (confirmed) {
      try {
        setIsArchiving(true);
        let apiError;
        
        if (note.archived) {
          const result = await unarchiveNote(id);
          apiError = result.error;
          success(t('noteUnarchived'));
        } else {
          const result = await archiveNote(id);
          apiError = result.error;
          success(t('noteArchived'));
        }
        
        if (apiError) {
          throw new Error('Failed to update note');
        }

        setNote(prevNote => ({
          ...prevNote,
          archived: !prevNote.archived
        }));
      } catch (err) {
        error(err.message || 'Failed to update note. Please try again.');
      } finally {
        setIsArchiving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="loading-spinner">
            <Loader className="spin" size={48} />
          </div>
          <p>{t('loading')}...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="page-container">
        <div className="error-state">
          <div className="error-icon">
            <AlertCircle size={64} />
          </div>
          <h2>Note Not Found</h2>
          <p>The note with ID "{id}" doesn't exist or may have been deleted.</p>
          <Link to="/" className="btn btn-outline">
            <ArrowLeft size={16} />
            <span>Back to All Notes</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">All Notes</Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{note.title}</span>
      </div>

      <div className="note-status-badge">
        <span className={`status-indicator ${note.archived ? 'archived' : 'active'}`}>
          {note.archived ? (
            <>
              <Archive size={16} />
              <span>{t('archived')}</span>
            </>
          ) : (
            <>
              <FileText size={16} />
              <span>{t('active')}</span>
            </>
          )}
        </span>
      </div>

      <article className="note-detail">
        <header className="note-detail-header">
          <h1 className="note-detail-title">{note.title}</h1>
          <div className="note-detail-meta">
            <span className="note-detail-date">
              <Calendar size={16} />
              <span>Created: {formatDate(note.createdAt)}</span>
            </span>
            <span className="note-detail-id">
              <Hash size={16} />
              <span>ID: {note.id}</span>
            </span>
          </div>
        </header>

        <div className="note-detail-body">
          {parser(note.body)}
        </div>
      </article>

      <div className="note-detail-actions">
        <Link to="/" className="btn btn-outline">
          <ArrowLeft size={16} />
          <span>{t('backToNotes')}</span>
        </Link>
        
        <button 
          className="btn btn-outline"
          onClick={handleArchiveToggle}
          disabled={isArchiving}
        >
          {isArchiving ? (
            <>
              <Loader size={16} className="spin" />
              <span>{t('processing')}</span>
            </>
          ) : note.archived ? (
            <>
              <ArchiveRestore size={16} />
              <span>{t('unarchive')}</span>
            </>
          ) : (
            <>
              <Archive size={16} />
              <span>{t('archive')}</span>
            </>
          )}
        </button>

        <button 
          className="btn btn-outline"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Loader size={16} className="spin" />
              <span>{t('processing')}</span>
            </>
          ) : (
            <>
              <Trash2 size={16} />
              <span>{t('delete')}</span>
            </>
          )}
        </button>
      </div>

      <div className="related-actions">
        <h3>{t('quickActions')}</h3>
        <div className="quick-actions">
          <Link to="/add" className="btn btn-outline">
            <Plus size={16} />
            <span>{t('addNewNote')}</span>
          </Link>
          <Link 
            to={note.archived ? "/archives" : "/"} 
            className="btn btn-outline"
          >
            {note.archived ? (
              <>
                <Archive size={16} />
                <span>View All Archives</span>
              </>
            ) : (
              <>
                <FileText size={16} />
                <span>View All Notes</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;