import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDialog } from '../contexts/DialogContext';
import { useLanguage } from '../contexts/LanguageContext';
import useInput from '../hooks/useInput';
import { getFirstName } from '../utils';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, isLoading } = useAuth();
  const { success, error } = useDialog();
  const { t } = useLanguage();
  
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      error(t('pleaseEnterEmail'), t('validationError'));
      return;
    }

    if (!password.trim()) {
      error(t('pleaseEnterPassword'), t('validationError'));
      return;
    }

    const result = await loginUser({ email: email.trim(), password });

    if (result.success) {
      success(`${t('welcomeBackUser')}, ${getFirstName(result.user.name)}!`, t('loginSuccessful'));
      
      const redirect = location.state?.from?.pathname || '/';
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } else {
      error(result.error || t('loginFailedMessage'), t('loginFailed'));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <LogIn size={32} />
          {t('signInToAccount')}
        </h1>
        <p className="page-subtitle">
          {t('welcomeBack')}
        </p>
      </div>

      <div className="add-note-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <Mail size={18} />
              <span>{t('emailAddress')} <span className="required">*</span></span>
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder={t('enterEmailAddress')}
              value={email}
              onChange={onEmailChange}
              disabled={isLoading}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <Lock size={18} />
              <span>{t('password')} <span className="required">*</span></span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-input"
                style={{ paddingRight: '3rem' }}
                placeholder={t('enterPassword')}
                value={password}
                onChange={onPasswordChange}
                disabled={isLoading}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '0.25rem'
                }}
                title={showPassword ? t('hidePassword') : t('showPassword')}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || !email.trim() || !password.trim()}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              {isLoading ? (
                <>
                  <Loader className="spin" size={16} />
                  <span>{t('signingIn')}</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>{t('signIn')}</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          padding: '1.5rem 0',
          borderTop: '1px solid var(--border)'
        }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            {t('dontHaveAccount')}
          </p>
          <Link to="/register" className="btn btn-outline" style={{ width: '100%' }}>
            {t('createNewAccount')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;