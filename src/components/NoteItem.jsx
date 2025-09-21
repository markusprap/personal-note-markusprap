import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Archive, ArchiveRestore, Trash2, Eye, FileText, Loader } from 'lucide-react';
import parser from 'html-react-parser';
import { archiveNote, unarchiveNote, deleteNote } from '../utils/network-data';
import { formatTranslation } from '../utils';
import { useDialog } from '../contexts/DialogContext';
import { useLanguage } from '../contexts/LanguageContext';

function NoteItem({ note, showArchiveButtons = false }) {
  const { id, title, body, createdAt, archived } = note;
  const { confirm, success, error } = useDialog();
  const { t } = useLanguage();
  const [isArchiving, setIsArchiving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


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
      formatTranslation(t('confirmArchiveNote'), { action }),
      `${action.charAt(0).toUpperCase() + action.slice(1)} ${t('note')}`
    );

    if (confirmed) {
      try {
        setIsArchiving(true);
        let apiError;
        
        if (archived) {
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
        
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        error(err.message || 'Failed to update note. Please try again.');
      } finally {
        setIsArchiving(false);
      }
    }
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
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        error(err.message || t('failedToDeleteNote'));
      } finally {
        setIsDeleting(false);
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
            <Eye size={16} />
            <span>{t('readMore')}</span>
          </Link>
          
          {showArchiveButtons && (
            <button 
              className="btn btn-outline"
              onClick={handleArchiveToggle}
              disabled={isArchiving}
              title={archived ? 'Unarchive note' : 'Archive note'}
            >
              {isArchiving ? (
                <>
                  <Loader size={16} className="spin" />
                  <span>{t('processing')}</span>
                </>
              ) : archived ? (
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
          )}

          <button 
            className="btn btn-outline"
            onClick={handleDelete}
            disabled={isDeleting}
            title={t('deleteNotePermanently')}
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
      </div>
      
      <div className="note-thumbnail">
        <FileText size={24} />
      </div>
    </div>
  );
}

export default NoteItem;