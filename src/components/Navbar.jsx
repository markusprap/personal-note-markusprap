import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StickyNote, FileText, Archive, Plus, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <StickyNote size={24} />
          <span>Personal Notes</span>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className={isActive('/')}>
            <FileText size={18} />
            <span>All Notes</span>
          </Link>
          <Link to="/archives" className={isActive('/archives')}>
            <Archive size={18} />
            <span>Archives</span>
          </Link>
          
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;