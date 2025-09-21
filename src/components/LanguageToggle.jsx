import React from 'react';
import { Globe, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage, isIndonesian, isEnglish } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="language-toggle-btn"
      title={isIndonesian ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
      aria-label={isIndonesian ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text)',
        fontSize: '0.875rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'var(--hover-bg)';
        e.target.style.transform = 'translateY(-1px)';
        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'var(--card-bg)';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      <Languages size={16} style={{ color: 'var(--text-secondary)' }} />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        <span style={{
          opacity: isIndonesian ? 1 : 0.5,
          transition: 'opacity 0.2s ease',
          fontWeight: isIndonesian ? '600' : '400'
        }}>
          ID
        </span>
        
        <div style={{
          width: '24px',
          height: '12px',
          borderRadius: '6px',
          backgroundColor: isIndonesian ? '#ef4444' : '#3b82f6',
          position: 'relative',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            position: 'absolute',
            top: '1px',
            left: isIndonesian ? '1px' : '13px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }} />
        </div>
        
        <span style={{
          opacity: isEnglish ? 1 : 0.5,
          transition: 'opacity 0.2s ease',
          fontWeight: isEnglish ? '600' : '400'
        }}>
          EN
        </span>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, ${isIndonesian ? '#ef4444' : 'transparent'} 0%, ${isIndonesian ? '#ef4444' : 'transparent'} 50%, ${isEnglish ? '#3b82f6' : 'transparent'} 50%, ${isEnglish ? '#3b82f6' : 'transparent'} 100%)`,
        transition: 'all 0.3s ease'
      }} />
    </button>
  );
}