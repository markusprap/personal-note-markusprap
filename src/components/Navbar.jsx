import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StickyNote, FileText, Archive, Plus, Sun, Moon, LogOut, User, LogIn } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { getFirstName } from '../utils';

function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { t } = useLanguage();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <StickyNote size={24} />
          <span>{t('personalNotes')}</span>
        </Link>
        
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/" className={isActive('/')}>
                <FileText size={18} />
                <span>{t('allNotes')}</span>
              </Link>
              <Link to="/archives" className={isActive('/archives')}>
                <Archive size={18} />
                <span>{t('archives')}</span>
              </Link>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem',
                borderLeft: '1px solid var(--border)',
                marginLeft: '0.5rem'
              }}>
                <User size={16} />
                <span>{getFirstName(user?.name)}</span>
              </div>

              <div className="navbar-controls" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LanguageToggle />
                <button 
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                  title={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              <button 
                className="nav-link"
                onClick={handleLogout}
                title={t('logout')}
                style={{ 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                <LogOut size={18} />
                <span>{t('logout')}</span>
              </button>
            </>
          ) : (
            <>
              <div className="navbar-controls" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LanguageToggle />
                <button 
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                  title={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
              
              <Link to="/login" className={isActive('/login')}>
                <LogIn size={18} />
                <span>{t('login')}</span>
              </Link>
              <Link to="/register" className={isActive('/register')}>
                <User size={18} />
                <span>{t('register')}</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;