import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DialogProvider } from './contexts/DialogContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddNotePage from './pages/AddNotePage';
import ArchivePage from './pages/ArchivePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/style.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <DialogProvider>
          <AuthProvider>
            <Router>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/notes/:id" element={
                    <ProtectedRoute>
                      <DetailPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/add" element={
                    <ProtectedRoute>
                      <AddNotePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/archives" element={
                    <ProtectedRoute>
                      <ArchivePage />
                    </ProtectedRoute>
                  } />

                  <Route path="/login" element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  } />
                  <Route path="/register" element={
                    <PublicRoute>
                      <RegisterPage />
                    </PublicRoute>
                  } />
                  
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AuthProvider>
      </DialogProvider>
    </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
