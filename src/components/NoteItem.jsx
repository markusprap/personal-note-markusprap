import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Archive, ArchiveRestore, Trash2, Eye, FileText } from 'lucide-react';
import parser from 'html-react-parser';
import { archiveNote, unarchiveNote, deleteNote } from '../utils/local-data';
import { useDialog } from '../contexts/DialogContext';

function NoteItem({ note, showArchiveButtons = false }) {
  const { id, title, body, createdAt, archived } = note;
  const { confirm, success, error } = useDialog();


  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const truncateText = (text, maxLength = 100) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength 
      ? plainText.slice(0, maxLength) + '...'
      : plainText;
  };

  const handleArchiveToggle = async () => {
    const action = archived ? 'unarchive' : 'archive';
    const confirmed = await confirm(
      `Are you sure you want to ${action} this note?`,
      `${action.charAt(0).toUpperCase() + action.slice(1)} Note`
    );

    if (confirmed) {
      try {
        if (archived) {
          unarchiveNote(id);
          success('Note unarchived successfully!');
        } else {
          archiveNote(id);
          success('Note archived successfully!');
        }
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        error('Failed to update note. Please try again.');
      }
    }
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
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        error('Failed to delete note. Please try again.');
      }
    }
  };

  return (
    <div className={`note-item ${archived ? 'archived' : ''}`}>

      <div className="note-content">
        <div className="note-header">
          <Link to={`/notes/${id}`} className="note-title-link">
            <h3 className="note-title">{title}</h3>
          </Link>
          {archived && (
            <span className="note-status">Archived</span>
          )}
        </div>

        <div className="note-meta">
          <span className="note-date">
            <Calendar size={14} />
            <span>{formatDate(createdAt)}</span>
          </span>
        </div>

        <div className="note-body-preview">
          {truncateText(body)}
        </div>

        <div className="note-actions">
          <Link to={`/notes/${id}`} className="btn btn-outline">
            <span>Read more</span>
          </Link>
          
          {showArchiveButtons && (
            <button 
              className="btn btn-outline"
              onClick={handleArchiveToggle}
              title={archived ? 'Unarchive note' : 'Archive note'}
            >
              {archived ? (
                <span>Unarchive</span>
              ) : (
                <span>Archive</span>
              )}
            </button>
          )}

          <button 
            className="btn btn-outline"
            onClick={handleDelete}
            title="Delete note permanently"
          >
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Note Thumbnail */}
      <div className="note-thumbnail">
        <FileText size={24} />
      </div>
    </div>
  );
}

export default NoteItem;