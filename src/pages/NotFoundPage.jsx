import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, ArrowLeft, FileText, Archive, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function NotFoundPage() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <div className="page-container">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-animation">
            <div className="error-code">404</div>
            <div className="error-emoji">
              <Search size={48} />
            </div>
          </div>

          <div className="not-found-text">
            <h1>{t('pageNotFound')}</h1>
            <p className="not-found-description">
              {t('pageNotFoundDesc')}
            </p>
            
            <div className="not-found-url">
              <strong>{t('requestedUrl')}</strong> 
              <code>{location.pathname}</code>
            </div>
          </div>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <Home size={16} />
              <span>{t('goToHomepage')}</span>
            </Link>
            
            <Link to="/add" className="btn btn-outline">
              <Plus size={16} />
              <span>{t('createNewNote')}</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-outline"
            >
              <ArrowLeft size={16} />
              <span>{t('goBack')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;