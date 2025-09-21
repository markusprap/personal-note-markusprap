import React, { createContext, useContext, useState } from 'react';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';

const DialogContext = createContext();

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState([]);

  const showDialog = (config) => {
    const id = Date.now() + Math.random();
    const dialog = { id, ...config };
    setDialogs(prev => [...prev, dialog]);
    

    if (config.autoClose) {
      setTimeout(() => {
        closeDialog(id);
      }, config.autoClose);
    }
    
    return id;
  };

  const closeDialog = (id) => {
    setDialogs(prev => prev.filter(dialog => dialog.id !== id));
  };

  const confirm = (message, title = 'Confirm Action') => {
    return new Promise((resolve) => {
      showDialog({
        type: 'confirm',
        title,
        message,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });
  };

  const alert = (message, title = 'Information', type = 'info') => {
    return showDialog({
      type: 'alert',
      variant: type,
      title,
      message,
      autoClose: 3000
    });
  };

  const success = (message, title = 'Success') => {
    return alert(message, title, 'success');
  };

  const error = (message, title = 'Error') => {
    return alert(message, title, 'error');
  };

  const warning = (message, title = 'Warning') => {
    return alert(message, title, 'warning');
  };

  return (
    <DialogContext.Provider value={{ 
      showDialog, 
      closeDialog, 
      confirm, 
      alert, 
      success, 
      error, 
      warning 
    }}>
      {children}
      <DialogContainer dialogs={dialogs} onClose={closeDialog} />
    </DialogContext.Provider>
  );
};

const DialogContainer = ({ dialogs, onClose }) => {
  if (dialogs.length === 0) return null;

  return (
    <div className="dialog-overlay">
      {dialogs.map(dialog => (
        <Dialog key={dialog.id} dialog={dialog} onClose={onClose} />
      ))}
    </div>
  );
};

const Dialog = ({ dialog, onClose }) => {
  const { id, type, variant, title, message, onConfirm, onCancel } = dialog;

  const handleConfirm = () => {
    onConfirm && onConfirm();
    onClose(id);
  };

  const handleCancel = () => {
    onCancel && onCancel();
    onClose(id);
  };

  const getIcon = () => {
    switch (variant || type) {
      case 'success':
        return <CheckCircle className="dialog-icon success" />;
      case 'error':
        return <AlertCircle className="dialog-icon error" />;
      case 'warning':
        return <AlertTriangle className="dialog-icon warning" />;
      case 'confirm':
        return <AlertTriangle className="dialog-icon warning" />;
      default:
        return <Info className="dialog-icon info" />;
    }
  };

  return (
    <div className="dialog-backdrop" onClick={() => onClose(id)}>
      <div className="dialog-content" onClick={e => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-title-section">
            {getIcon()}
            <h3 className="dialog-title">{title}</h3>
          </div>
          <button 
            className="dialog-close-btn"
            onClick={() => onClose(id)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="dialog-body">
          <p className="dialog-message">{message}</p>
        </div>

        <div className="dialog-actions">
          {type === 'confirm' ? (
            <>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleConfirm}>
                Confirm
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => onClose(id)}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};