import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Hash, 
  Archive, 
  ArchiveRestore, 
  Trash2, 
  Plus, 
  FileText,
  Loader,
  AlertCircle
} from 'lucide-react';
import parser from 'html-react-parser';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { useDialog } from '../contexts/DialogContext';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { confirm, success, error } = useDialog();

  useEffect(() => {
    const foundNote = getNote(id);
    if (foundNote) {
      setNote(foundNote);
    }
    setLoading(false);
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
      'This action cannot be undone. Are you sure you want to delete this note?',
      'Delete Note'
    );

    if (confirmed) {
      try {
        deleteNote(id);
        success('Note deleted successfully!');
        setTimeout(() => navigate('/'), 1500);
      } catch (err) {
        error('Failed to delete note. Please try again.');
      }
    }
  };

  const handleArchiveToggle = async () => {
    const action = note.archived ? 'unarchive' : 'archive';
    const confirmed = await confirm(
      `Are you sure you want to ${action} this note?`,
      `${action.charAt(0).toUpperCase() + action.slice(1)} Note`
    );

    if (confirmed) {
      try {
        if (note.archived) {
          unarchiveNote(id);
          success('Note unarchived successfully!');
        } else {
          archiveNote(id);
          success('Note archived successfully!');
        }
        

        setNote(prevNote => ({
          ...prevNote,
          archived: !prevNote.archived
        }));
      } catch (err) {
        error('Failed to update note. Please try again.');
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
          <p>Loading note...</p>
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
              <span>Archived</span>
            </>
          ) : (
            <>
              <FileText size={16} />
              <span>Active</span>
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
          <span>Back to Notes</span>
        </Link>
        
        <button 
          className="btn btn-outline"
          onClick={handleArchiveToggle}
        >
          {note.archived ? (
            <>
              <ArchiveRestore size={16} />
              <span>Unarchive</span>
            </>
          ) : (
            <>
              <Archive size={16} />
              <span>Archive</span>
            </>
          )}
        </button>

        <button 
          className="btn btn-outline"
          onClick={handleDelete}
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>

      <div className="related-actions">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <Link to="/add" className="btn btn-outline">
            <Plus size={16} />
            <span>Add New Note</span>
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