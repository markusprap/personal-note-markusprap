import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, User, Mail, Lock, Loader, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDialog } from '../contexts/DialogContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatTranslation } from '../utils';
import useInput from '../hooks/useInput';

function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser, isLoading } = useAuth();
  const { success, error } = useDialog();
  const { t } = useLanguage();
  
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      error('Please enter your full name', 'Validation Error');
      return false;
    }

    if (name.trim().length < 2) {
      error(t('nameTooShort'), t('validationError'));
      return false;
    }

    if (!email.trim()) {
      error('Please enter your email address', 'Validation Error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      error('Please enter a valid email address', 'Validation Error');
      return false;
    }

    if (!password) {
      error('Please enter a password', 'Validation Error');
      return false;
    }

    if (password.length < 6) {
      error(t('passwordTooShort'), t('validationError'));
      return false;
    }

    if (confirmPassword !== password) {
      error('Passwords do not match', 'Validation Error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await registerUser({
      name: name.trim(),
      email: email.trim(),
      password
    });

    if (result.success) {
      success(
        'Account created successfully! Please sign in with your new credentials.',
        'Registration Successful'
      );
      setTimeout(() => navigate('/login'), 2000);
    } else {
      error(result.error || 'Registration failed. Please try again.', 'Registration Failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isFormValid = () => {
    return name.trim().length >= 2 && 
           email.trim() && 
           password.length >= 6 && 
           confirmPassword === password;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <UserPlus size={32} />
          {t('createYourAccount')}
        </h1>
        <p className="page-subtitle">
          {t('joinToday')} {t('dataSecureEncrypted')}
        </p>
      </div>

      <div className="add-note-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <User size={18} />
              <span>{t('fullName')} <span className="required">*</span></span>
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder={t('enterFullName')}
              value={name}
              onChange={onNameChange}
              disabled={isLoading}
              required
              autoComplete="name"
            />
            <div className="form-helper">
              {formatTranslation(t('minimumCharsRequired'), { count: 2 })}
            </div>
          </div>

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
            <div className="form-helper">
              We'll use this to send you important updates
            </div>
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
                placeholder={t('createStrongPassword')}
                value={password}
                onChange={onPasswordChange}
                disabled={isLoading}
                required
                autoComplete="new-password"
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
            <div className="form-helper">
              {formatTranslation(t('minimumCharsRequired'), { count: 6 })}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              <CheckCircle size={18} />
              <span>{t('confirmPassword')} <span className="required">*</span></span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="form-input"
                style={{ paddingRight: '3rem' }}
                placeholder={t('confirmPassword')}
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                disabled={isLoading}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
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
                title={showConfirmPassword ? t('hidePassword') : t('showPassword')}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPassword && (
              <div className="form-helper">
                {confirmPassword === password ? (
                  <span style={{ color: 'var(--success)' }}>✓ Passwords match</span>
                ) : (
                  <span style={{ color: 'var(--error)' }}>✗ Passwords do not match</span>
                )}
              </div>
            )}
          </div>

          <div className="form-actions" style={{ marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || !isFormValid()}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              {isLoading ? (
                <>
                  <Loader className="spin" size={16} />
                  <span>{t('creatingAccount')}</span>
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  <span>{t('createAccount')}</span>
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
            {t('alreadyHaveAccount')}
          </p>
          <Link to="/login" className="btn btn-outline" style={{ width: '100%' }}>
            {t('signInToYourAccount')}
          </Link>
        </div>
      </div>


    </div>
  );
}

export default RegisterPage;