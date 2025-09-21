import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Save, Lightbulb, Type, FileText, Loader } from 'lucide-react';
import { addNote } from '../utils/network-data';
import { formatTranslation } from '../utils';
import { useDialog } from '../contexts/DialogContext';
import { useLanguage } from '../contexts/LanguageContext';

function AddNotePage() {
  const navigate = useNavigate();
  const { confirm, success, error } = useDialog();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (e) => {
    const value = e.target.value;

    if (value.length <= 50) {
      setFormData(prev => ({
        ...prev,
        title: value
      }));
    }
  };

  const handleBodyChange = (e) => {
    setFormData(prev => ({
      ...prev,
      body: e.target.innerHTML
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      error('Please enter a note title', 'Validation Error');
      return;
    }

    if (!formData.body.trim()) {
      error('Please enter note content', 'Validation Error');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: apiError, data } = await addNote({
        title: formData.title.trim(),
        body: formData.body
      });

      if (apiError || !data) {
        throw new Error('Failed to create note');
      }

      success(t('noteCreated'), t('success'));
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      error(err.message || 'Error creating note. Please try again.', 'Creation Failed');
      console.error('Error adding note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (formData.title || formData.body) {
      const confirmed = await confirm(
        t('confirmCancelAddNote'),
        t('discardChanges')
      );
      if (confirmed) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const remainingChars = 50 - formData.title.length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <Plus size={32} />
          {t('addNewNote')}
        </h1>
        <p className="page-subtitle">          {t('createNewNote')}</p>
      </div>

      <form onSubmit={handleSubmit} className="add-note-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            <Type size={18} />
            <span>{t('noteTitle')} <span className="required">*</span></span>
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder={t('enterNoteTitle')}
            value={formData.title}
            onChange={handleTitleChange}
            disabled={isSubmitting}
            required
          />
          <div className="form-helper">
            <span className={`char-counter ${remainingChars < 10 ? 'warning' : ''}`}>
              {formatTranslation(t('charactersRemaining'), { count: remainingChars })}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="body" className="form-label">
            <FileText size={18} />
            <span>{t('noteContent')} <span className="required">*</span></span>
          </label>
          <div className="rich-text-info">
            <Lightbulb size={16} />
            <span dangerouslySetInnerHTML={{ __html: t('formattingTip') }} />
          </div>
          <div
            className="form-rich-input"
            contentEditable
            data-placeholder={t('startWritingNote')}
            onInput={handleBodyChange}
            suppressContentEditableWarning={true}
          />
          <div className="form-helper">
            <span dangerouslySetInnerHTML={{ __html: t('enterTip') }} />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <X size={16} />
            <span>{t('cancel')}</span>
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !formData.title.trim() || !formData.body.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader className="spin" size={16} />
                <span>{t('creating')}</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>{t('createNote')}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {(formData.title || formData.body) && (
        <div className="form-preview">
          <h3>
            <FileText size={20} />
            Preview:
          </h3>
          <div className="preview-card">
            <h4>{formData.title || 'Untitled Note'}</h4>
            <div 
              className="preview-body"
              dangerouslySetInnerHTML={{ __html: formData.body || '<em>No content yet...</em>' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNotePage;